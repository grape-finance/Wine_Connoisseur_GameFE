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

const firebaseConfig = {
  apiKey: "AIzaSyAr43A6q9T4_PoXzsdXmmXOEFA3vExDev8",
  authDomain: "winemaker-dd8a2.firebaseapp.com",
  projectId: "winemaker-dd8a2",
  storageBucket: "winemaker-dd8a2.appspot.com",
  messagingSenderId: "410209408516",
  appId: "1:410209408516:web:b92d310088f39e521c8751",
};

export type LeaderboardUser = {
  id: string;
  maxVpm: number;
  currentVpm: number;
  level: number;
  stakedVintners: number;
  stakedVintnersMasters: number;
  restingVintners: number;
  restingVintnersMasters: number;
  tools: Map<string, number>;
  skills: Map<string, number>;
};

export class FirebaseHelper {
  db: Firestore;
  wineryContract: Contract;
  wineryProgressionContract: Contract;

  constructor(wineryContract: Contract, wineryProgressionContract: Contract) {
    this.db = getFirestore(initializeApp(firebaseConfig));
    this.wineryContract = wineryContract;
    this.wineryProgressionContract = wineryProgressionContract;
  }

  async getAllUsers(count: number): Promise<LeaderboardUser[]> {
    let leaderboardUsers: LeaderboardUser[] = [];

    const userRef = collection(this.db, "users");
    const q = query(userRef, orderBy("maxVpm", 'desc'), limit(count))    
    const users = await getDocs(q);
    users.forEach(async (user) => {
      const userData = user.data();
      leaderboardUsers.push({
        id: user.id,
        level: userData.level,
        maxVpm: userData.maxVpm,
        currentVpm: userData.currentVpm,
        stakedVintners: 0,
        stakedVintnersMasters: 0,
        restingVintners: 0,
        restingVintnersMasters: 0,
        tools: new Map<string, number>(),
        skills: new Map<string, number>(),
      });
    });

    await leaderboardUsers.reduce(async (referencePoint, user) => {
      await referencePoint;
      await this.getVintners(user);
      await this.getTools(user);
      await this.getSkills(user);
    }, Promise.resolve());

    return leaderboardUsers.sort((a, b) =>
      a.maxVpm > b.maxVpm ? -1 : a.maxVpm < b.maxVpm ? 1 : 0
    );
  }

  async setField(field: string, value: string | number, account: string) {
    const userRef = doc(this.db, "users", account);
    this.dispatchFieldUpdate(userRef, field, value);
  }

  private async dispatchFieldUpdate(
    ref: DocumentReference<DocumentData>,
    field: string,
    value: string | number
  ) {
    let doc = {};
    if (field === "currentVpm") {
      const user = await getDoc(ref);
      doc = {
        currentVpm: Number(value),
        currentVpmDate: Timestamp.fromDate(new Date()),
        maxVpm: this.getMaxVPM(user, value),
        maxVpmDate: this.getMaxVPMDate(user, value),
      };
    } else if (field === "level") {
      doc = { level: Number(value), levelDate: Timestamp.fromDate(new Date()) };
    }

    console.log(
      `%c[addProgressOnBadge] Doc ${JSON.stringify(doc, null, 2)}`,
      "color: blue"
    );
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
    tools.forEach((tool: any) => {
      const toolPPM = Number(tool.toolPPM);
      const toolName = this.toolPPMToToolName(toolPPM);
      user.tools.set(
        toolName,
        user.tools[toolName] ? user.tools[toolName] + 1 : 1
      );
    });
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
    console.log("Skills = " + JSON.stringify(user.skills));
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

  toolPPMToToolName(toolPPM: number): string {
    if (toolPPM === 1) {
      return "Wine Mag 93";
    } else if (toolPPM === 3) {
      return "Pruning Shears";
    } else if (toolPPM === 5) {
      return "Hydrometer";
    }
    return "";
  }
}
