import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import DatabaseMethods from "./database.js";

class AuthMethods {
  constructor() {
    this.auth = getAuth();
    this.database = new DatabaseMethods();
  }

  async getCurrentUser() {
    return await this.auth.currentUser;
  }

  async signInWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, googleProvider);
      const userDetails = result.user;

      if (result) {
        const userInfoMap = {
          Name: userDetails.displayName,
          Image: userDetails.photoURL,
          Email: userDetails.email,
          id: userDetails.uid,
          createdAt: new Date().toISOString(),
        };

        console.log("Attempting to save user to Firestore:", userInfoMap);
        
        try {
          await this.database.addUserDetail(userInfoMap, userDetails.uid);
          console.log("✅ User successfully saved to Firestore");
        } catch (dbError) {
          console.error("❌ Error saving to Firestore:", dbError);
          // Don't throw here, user is still authenticated
        }
        
        // Show success message (you can implement a toast notification here)
        console.log("Usuário criado com sucesso");
        
        return { success: true, user: userDetails };
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  }

  async signUpWithEmail(email, password, displayName) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      const userDetails = result.user;

      if (result) {
        const userInfoMap = {
          Name: displayName || email.split('@')[0],
          Image: null,
          Email: userDetails.email,
          id: userDetails.uid,
          createdAt: new Date().toISOString(),
        };

        console.log("Attempting to save user to Firestore:", userInfoMap);
        
        try {
          await this.database.addUserDetail(userInfoMap, userDetails.uid);
          console.log("✅ User successfully saved to Firestore");
        } catch (dbError) {
          console.error("❌ Error saving to Firestore:", dbError);
          // Don't throw here, user is still authenticated
        }
        
        console.log("Usuário criado com sucesso");
        
        return { success: true, user: userDetails };
      }
    } catch (error) {
      console.error("Email sign-up error:", error);
      throw error;
    }
  }

  async signInWithEmail(email, password) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Email sign-in error:", error);
      throw error;
    }
  }

  async signOut() {
    try {
      await this.auth.signOut();
      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }
}

export default AuthMethods; 