import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set, get) => ({
  currentUser: null,
  isLoading: true,

  // Fetch user information from Firestore
  fetchUserInfo: async (uid) => {
    if (!uid) {
      console.log("UID not found, setting currentUser to null");
      return set({ currentUser: null, isLoading: true });
    }
    try {
      const docRef = doc(db, "users", uid); // Ensure this references the correct document based on UID
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
        console.log("User data fetched successfully:", docSnap.data()); // Log the user data fetched
      } else {
        console.log("No such user document");
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log("Error fetching user info:", err);
      set({ currentUser: null, isLoading: false });
    }
  
    // Log the current user after it has been set
    const currentUser = get().currentUser; 
    console.log("Current user in store:", currentUser);
  },

  // Function to set the current user (used for logging out)
  setCurrentUser: (user) => set({ currentUser: user }),
}));
