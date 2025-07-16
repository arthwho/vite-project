import { getFirestore, doc, setDoc, collection, onSnapshot, query, getDocs, where, orderBy, limit, startAfter } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Arthur Silva Ferreira Coelho
//22.2.8100

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

  // List all users in the Firestore 'users' collection
  async listAllUsers() {
    try {
      const usersCol = collection(this.db, "users");
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return userList;
    } catch (error) {
      console.error("Error listing users:", error);
      throw error;
    }
  }

  // Generic method to query any collection by name
  async queryCollection(collectionName) {
    try {
      const col = collection(this.db, collectionName);
      const snapshot = await getDocs(col);
      const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return documents;
    } catch (error) {
      console.error(`Error querying collection ${collectionName}:`, error);
      throw error;
    }
  }

  // CLI-like method to execute Firestore queries
  async executeQuery(queryCommand) {
    try {
      const parts = queryCommand.trim().split(' ');
      const operation = parts[0].toLowerCase();
      
      switch (operation) {
        case 'list':
          // list collection_name
          if (parts.length < 2) {
            throw new Error('Usage: list <collection_name>');
          }
          const collectionName = parts[1];
          return await this.queryCollection(collectionName);
          
        case 'find':
          // find collection_name field operator value
          if (parts.length < 5) {
            throw new Error('Usage: find <collection> <field> <operator> <value>');
          }
          const [_, findCollection, field, operator, ...valueParts] = parts;
          const value = valueParts.join(' ');
          const findQuery = query(
            collection(this.db, findCollection),
            where(field, operator, value)
          );
          const findSnapshot = await getDocs(findQuery);
          return findSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
        case 'order':
          // order collection_name field direction
          if (parts.length < 4) {
            throw new Error('Usage: order <collection> <field> <asc|desc>');
          }
          const [__, orderCollection, orderField, direction] = parts;
          const orderQuery = query(
            collection(this.db, orderCollection),
            orderBy(orderField, direction === 'desc' ? 'desc' : 'asc')
          );
          const orderSnapshot = await getDocs(orderQuery);
          return orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
        case 'limit':
          // limit collection_name number
          if (parts.length < 3) {
            throw new Error('Usage: limit <collection> <number>');
          }
          const [___, limitCollection, limitNumber] = parts;
          const limitQuery = query(
            collection(this.db, limitCollection),
            limit(parseInt(limitNumber))
          );
          const limitSnapshot = await getDocs(limitQuery);
          return limitSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
        default:
          throw new Error(`Unknown operation: ${operation}. Available: list, find, order, limit`);
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
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