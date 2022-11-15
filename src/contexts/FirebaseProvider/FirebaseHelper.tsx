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
  DocumentSnapshot,
  orderBy,
  limit,
} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import { Contract } from "ethers";
import multicall from "utils/multicall";
import WINERYPROGRESSION_ABI from "abi/wineryProgression.json";
import WINERY_ABI from "abi/winery.json";
import { WINERYPROGRESSION_ADDRESS, WINERY_ADDRESS } from "config/address";
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

  async getWineryProgressData(wallet: string): Promise<[number, number]> {
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

    const [_fatiguePerMinute, _MAX_FATIGUE] = await multicall(
      WINERY_ABI,
      [
        {
          address: WINERY_ADDRESS[this.chainId],
          name: "getFatiguePerMinuteWithModifier",
          params: [wallet],
        },
        {
          address: WINERY_ADDRESS[this.chainId],
          name: "MAX_FATIGUE",
        },
      ],
      web3Provider,
      this.chainId
    );

    const fatiguePerMinute =
      ((_fatiguePerMinute * 60 * 24) / _MAX_FATIGUE) * 100;
    return [Number(_level[0]), Number(fatiguePerMinute)];
  }

  async getAllUsers(count: number): Promise<LeaderboardUser[]> {
    let leaderboardUsers: LeaderboardUser[] = [];

    const userRef = collection(this.db, "users");
    const q = query(userRef, orderBy("maxVpm", "desc"), limit(count));
    const users = await getDocs(q);
    users.forEach(async (user) => {
      const userData = user.data();
      leaderboardUsers.push({
        id: user.id,
        level: userData.level,
        maxVpm: userData.maxVpm,
        fatiguePerDay: 0,
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
      const [level, fatiguePerDay] = await this.getWineryProgressData(user.id);
      user.level = level;
      user.fatiguePerDay = fatiguePerDay;
      await this.getVintners(user);
      await this.getTools(user);
      await this.getSkills(user);
    }, Promise.resolve());

    return leaderboardUsers.sort((a, b) =>
      a.maxVpm > b.maxVpm ? -1 : a.maxVpm < b.maxVpm ? 1 : 0
    );
  }

  checkSetMaxVpm(maxVpm: number, account: string) {
    if (localStorage.getItem("refreshMaxVpm") === "true") {
      localStorage.removeItem("refreshMaxVpm");
      this.setMaxVPM(maxVpm, account);
    }
  }

  async setMaxVPM(value: string | number, account: string) {
    const userRef = doc(this.db, "users", account.toUpperCase());
    const user = await getDoc(userRef);
    if (
      !user.exists() ||
      (user.exists() && user.data().maxVpm < Number(value))
    ) {
      this.dispatchMaxVPM(userRef, value);
    }
  }

  private async dispatchMaxVPM(
    ref: DocumentReference<DocumentData>,
    value: string | number
  ) {
    let doc = {
      maxVpm: Number(value),
      maxVpmDate: Timestamp.fromDate(new Date()),
    };
    await setDoc(ref, doc, { merge: true });
  }

  getMaxVPMDate(user: DocumentSnapshot<DocumentData>, value: string | number) {
    if (!user.exists()) {
      return Timestamp.fromDate(new Date());
    }
    if (
      user.exists() &&
      (!user.data().maxVpm || user.data().maxVpm < Number(value))
    ) {
      return Timestamp.fromDate(new Date());
    }
    return user.data()!.maxVpmDate;
  }

  getMaxVPM(user: DocumentSnapshot<DocumentData>, value: string | number) {
    if (!user.exists()) {
      return Number(value);
    }
    if (
      user.exists() &&
      (!user.data().maxVpm || user.data().maxVpm < Number(value))
    ) {
      return Number(value);
    }
    return user.data()!.maxVpm;
  }

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
    let countMag = 0
    let countShear = 0
    let countHydro = 0
    let countCorker = 0

    tools.forEach((tool: any) => {
      const toolPPM = Number(tool.toolPPM);
      if (toolPPM === 2) {
        countMag++
      }
      else if (toolPPM === 3) {
        countShear++
      }
      else if (toolPPM === 5) {
        countHydro++
      } 
      else if (toolPPM === 6) {
        countCorker++
      }    
    });
    user.tools[0] = countMag
    user.tools[1] = countShear
    user.tools[2] = countHydro
    user.tools[3] = countCorker
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
