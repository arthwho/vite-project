import { getFirestore, doc, setDoc, collection, onSnapshot, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

class DatabaseMethods {
  constructor() {
    this.db = getFirestore();
    console.log("DatabaseMethods initialized with db:", this.db);
  }

  async addUserDetail(userInfoMap, id) {
    try {
      console.log("Adding user detail to Firestore:", { userInfoMap, id });
      console.log("Database instance:", this.db);
      
      const userDocRef = doc(this.db, "users", id);
      console.log("Document reference:", userDocRef);
      
      const result = await setDoc(userDocRef, userInfoMap);
      console.log("Firestore setDoc result:", result);
      
      return result;
    } catch (error) {
      console.error("Error adding user detail:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  async addEvent(eventInfoMap, id) {
    try {
      return await setDoc(doc(this.db, "events", id), eventInfoMap);
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  }

  getAllEvents(callback) {
    const q = query(collection(this.db, "events"));
    return onSnapshot(q, (querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      callback(events);
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }
}

export default DatabaseMethods; 