import {
  getFirestore,
  Firestore,
  doc,
  query,
  getDoc,
  Timestamp,
  setDoc,
  getDocs,
  collection,
  DocumentReference,
  DocumentData,
  orderBy,
  limit,
} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import { Contract } from "ethers";
import multicall from "utils/multicall";
import WINERYPROGRESSION_ABI from "abi/wineryProgression.json";
import { WINERYPROGRESSION_ADDRESS } from "config/address";
import NETWORKS from "config/network";

const firebaseConfig = {
  apiKey: "AIzaSyDjjc6ldF65hzmTannsN7n3SCCLEuPChCk",
  authDomain: "dev-wine-e32e4.firebaseapp.com",
  projectId: "dev-wine-e32e4",
  storageBucket: "dev-wine-e32e4.appspot.com",
  messagingSenderId: "146488994345",
  appId: "1:146488994345:web:2383c7c5b0fe432fd60a38",
};

export type LeaderboardUser = {
  id: string;
  maxVpm: number;
  fatiguePerDay: number;
  level: number;
  stakedVintners: number;
  stakedVintnersMasters: number;
  restingVintners: number;
  restingVintnersMasters: number;
  tools: [number, number, number, number];
  skills: Map<string, number>;
};

export class FirebaseHelper {
  db: Firestore;
  wineryContract: Contract;
  wineryProgressionContract: Contract;
  chainId: number;

  constructor(
    wineryContract: Contract,
    wineryProgressionContract: Contract,
    chainId: number
  ) {
    this.db = getFirestore(initializeApp(firebaseConfig));
    this.wineryContract = wineryContract;
    this.wineryProgressionContract = wineryProgressionContract;
    this.chainId = chainId;
  }

  async getWineryProgressData(wallet: string): Promise<number> {
    const web3Provider: string = NETWORKS.filter(
      (item) => item.chainId === this.chainId
    )[0]?.defaultProvider[0];

    const [_level] = await multicall(
      WINERYPROGRESSION_ABI,
      [
        {
          address: WINERYPROGRESSION_ADDRESS[this.chainId],
          name: "getLevel",
          params: [wallet],
        },
      ],
      web3Provider,
      this.chainId
    );

    return Number(_level[0]);
  }

  async getAllUsers(count: number): Promise<LeaderboardUser[]> {
    let leaderboardUsers: LeaderboardUser[] = [];

    const userRef = collection(this.db, "users");
    const q = query(userRef, orderBy("fatiguePerDay", "desc"), limit(count));
    const users = await getDocs(q);
    users.forEach(async (user) => {
      const userData = user.data();
      leaderboardUsers.push({
        id: user.id,
        level: userData.level,
        maxVpm: userData.maxVpm,
        fatiguePerDay: userData.fatiguePerDay,
        stakedVintners: 0,
        stakedVintnersMasters: 0,
        restingVintners: 0,
        restingVintnersMasters: 0,
        tools: [0, 0, 0, 0],
        skills: new Map<string, number>(),
      });
    });

    await leaderboardUsers.reduce(async (referencePoint, user) => {
      await referencePoint;
      user.level = await this.getWineryProgressData(user.id);
      // user.fatiguePerDay = fatiguePerDay;
      await this.getVintners(user);
      await this.getTools(user);
      await this.getSkills(user);
    }, Promise.resolve());

    return leaderboardUsers.sort((a, b) =>
      a.fatiguePerDay > b.fatiguePerDay
        ? -1
        : a.fatiguePerDay < b.fatiguePerDay
        ? 1
        : 0
    );
  }

  checkRefreshStats(maxVpm: number, fatiguePerDay: number, account: string) {
    console.log(`[checkRefreshStats] maxVpm = ${maxVpm}, fatiguePerDay = ${fatiguePerDay}`)
    if (localStorage.getItem("refreshFirecloudStats") === "true") {
      localStorage.removeItem("refreshFirecloudStats");
      this.setPlayerStats(maxVpm, fatiguePerDay, account);
    }
  }

  async setPlayerStats(
    maxVpm: string | number,
    fatiguePerDay: string | number,
    account: string
  ) {
    const userRef = doc(this.db, "users", account);
    const user = await getDoc(userRef);
    if (
      !user.exists() ||
      (user.exists() && user.data().fatiguePerDay < Number(fatiguePerDay))
    ) {
      this.dispatchUpdate(userRef, maxVpm, fatiguePerDay);
    }
  }

  private async dispatchUpdate(
    ref: DocumentReference<DocumentData>,
    maxVpm: string | number,
    fatiguePerDay: string | number
  ) {
    let doc = {
      maxVpm: Number(maxVpm),
      fatiguePerDay: Number(fatiguePerDay),
      lastUpdateDate: Timestamp.fromDate(new Date()),
    };
    await setDoc(ref, doc, { merge: true });
  }

  // getLastUpdateDate(user: DocumentSnapshot<DocumentData>, value: string | number) {
  //   if (!user.exists()) {
  //     return Timestamp.fromDate(new Date());
  //   }
  //   if (
  //     user.exists() &&
  //     (!user.data().maxVpm || user.data().maxVpm < Number(value))
  //   ) {
  //     return Timestamp.fromDate(new Date());
  //   }
  //   return user.data()!.lastUpdateDate;
  // }

  // getMaxVPM(user: DocumentSnapshot<DocumentData>, value: string | number) {
  //   if (!user.exists()) {
  //     return Number(value);
  //   }
  //   if (
  //     user.exists() &&
  //     (!user.data().maxVpm || user.data().maxVpm < Number(value))
  //   ) {
  //     return Number(value);
  //   }
  //   return user.data()!.maxVpm;
  // }

  async getVintners(user: any) {
    const vintners = await this.fetchVintners(user.id);
    vintners.forEach((vintner: any) => {
      if (!vintner.isResting && Number(vintner.vintnerPPM) === 1) {
        user.stakedVintners++;
      } else if (!vintner.isResting && Number(vintner.vintnerPPM) === 3) {
        user.stakedVintnersMasters++;
      } else if (vintner.isResting && Number(vintner.vintnerPPM) === 1) {
        user.restingVintners++;
      } else if (vintner.isResting && Number(vintner.vintnerPPM) === 3) {
        user.restingVintnersMasters++;
      }
    });
  }

  async getTools(user: any) {
    const tools = await this.fetchTools(user.id);
    let countMag = 0;
    let countShear = 0;
    let countHydro = 0;
    let countCorker = 0;

    tools.forEach((tool: any) => {
      const toolPPM = Number(tool.toolPPM);
      if (toolPPM === 2) {
        countMag++;
      } else if (toolPPM === 3) {
        countShear++;
      } else if (toolPPM === 5) {
        countHydro++;
      } else if (toolPPM === 6) {
        countCorker++;
      }
    });
    user.tools[0] = countMag;
    user.tools[1] = countShear;
    user.tools[2] = countHydro;
    user.tools[3] = countCorker;
  }

  async getSkills(user: any) {
    const skills = await this.fetchSkills(user.id);
    user.skills.set("quality", Number(skills[0]));
    user.skills.set("fatigue", Number(skills[1]));
    user.skills.set("cellar", Number(skills[2]));
    user.skills.set("mastery", Number(skills[3]));
    user.skills.set("upgrades", Number(skills[4]));
    user.skills.set("vintners", Number(skills[5]));
    user.skills.set("storage", Number(skills[6]));
  }

  async fetchVintners(wallet: string): Promise<[{}]> {
    return await this.wineryContract.batchedStakesOfOwner(wallet, 0, 10000);
  }

  async fetchTools(wallet: string): Promise<[{}]> {
    return await this.wineryContract.batchedToolsOfOwner(wallet, 0, 10000);
  }

  async fetchSkills(wallet: string): Promise<Array<number>> {
    return await this.wineryProgressionContract.getSkillsLearned(wallet);
  }
}
