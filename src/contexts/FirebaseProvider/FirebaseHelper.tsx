import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  Timestamp,
  setDoc,
  getDocs,
  collection,
  DocumentReference,
  DocumentData,
} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";

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
  vpm: number;
  level: number;
};

export class FirebaseHelper {
  db: Firestore;

  constructor() {
    this.db = getFirestore(initializeApp(firebaseConfig));
  }

  async getAllUsers(): Promise<LeaderboardUser[]> {
    const users = await getDocs(collection(this.db, "users"));
    let leaderboardUsers: LeaderboardUser[] = [];
    users.forEach((user) => {
      const userData = user.data();
      leaderboardUsers.push({
        id: user.id,
        level: userData.level,
        vpm: userData.vpm,
      });
      console.log(
        `%c[getAllUsers] User ${user.id}: ${JSON.stringify(userData, null, 2)}`,
        "color: blue"
      );
    });
    return leaderboardUsers;
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
    if (field === "vpm") {
      doc = { vpm: Number(value), vpmDate: Timestamp.fromDate(new Date()) };
    } else if (field === "level") {
      doc = { level: Number(value), levelDate: Timestamp.fromDate(new Date()) };
    }

    await setDoc(ref, doc, { merge: true });
    console.log(`%c[addProgressOnBadge] set ${field}: ${value}`, "color: blue");
  }
}
