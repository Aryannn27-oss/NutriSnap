"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  weight: number;
  targetWeight: number;
  bodyFat: number;
  bmi: number;
  dietaryPrefs: string[];
  caloriesTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatsTarget: number;
  isPremium: boolean;
  memberSince: string;
  pushNotifications?: boolean;
  weeklyReport?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  profileData: ProfileData | null;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, first: string, last: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  updateUserProfileData: (data: Partial<ProfileData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (!currentUser) {
        setProfileData(null);
        setLoading(false);
      } else {
        // Setup listener for real-time Firestore profile changes
        const userDocRef = doc(db, "users", currentUser.uid);
        const unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfileData(docSnap.data() as ProfileData);
          } else {
            // Profile data doesn't exist yet (could happen if Google login for first time)
            setProfileData(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error listening to user profile:", error);
          setLoading(false);
        });

        return () => unsubscribeProfile();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, first: string, last: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const currentUser = userCredential.user;

    // Create the default user profile in Firestore
    const defaultProfile: ProfileData = {
      firstName: first,
      lastName: last,
      email: email,
      weight: 178,
      targetWeight: 165,
      bodyFat: 18,
      bmi: 23.4,
      dietaryPrefs: ["High Protein", "Gluten-Free", "Low Carb"],
      caloriesTarget: 2400,
      proteinTarget: 180,
      carbsTarget: 200,
      fatsTarget: 70,
      isPremium: true,
      memberSince: new Date().getFullYear().toString(),
      pushNotifications: true,
      weeklyReport: true,
    };

    await setDoc(doc(db, "users", currentUser.uid), defaultProfile);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const currentUser = userCredential.user;

    // Check if the user document already exists in Firestore; if not, create one
    const userDocRef = doc(db, "users", currentUser.uid);
    
    // We update/set conditionally. In client listener we'll wait for snapshot.
    // If first login, let's create a profile using google account display name.
    const displayName = currentUser.displayName || "";
    const nameParts = displayName.split(" ");
    const first = nameParts[0] || "User";
    const last = nameParts.slice(1).join(" ") || "";

    // Set doc with merge: true to avoid overwriting existing profiles
    await setDoc(userDocRef, {
      firstName: first,
      lastName: last,
      email: currentUser.email || "",
      weight: 178,
      targetWeight: 165,
      bodyFat: 18,
      bmi: 23.4,
      dietaryPrefs: ["High Protein", "Gluten-Free", "Low Carb"],
      caloriesTarget: 2400,
      proteinTarget: 180,
      carbsTarget: 200,
      fatsTarget: 70,
      isPremium: true,
      memberSince: new Date().getFullYear().toString(),
      pushNotifications: true,
      weeklyReport: true,
    }, { merge: true });
  };

  const updateUserProfileData = async (data: Partial<ProfileData>) => {
    if (!user) throw new Error("No authenticated user found");
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        profileData,
        signInWithEmail,
        signUpWithEmail,
        signOutUser,
        signInWithGoogle,
        updateUserProfileData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
