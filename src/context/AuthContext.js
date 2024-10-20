import { createContext, useEffect, useState,useContext } from "react";
import { auth } from "../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setCurrentUser(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        setCurrentUser(null); // Handle case when user is logged out
      }
    });
  
    // Cleanup subscription
    return () => unsub();
  }, []);
  

  return (
    <AuthContext.Provider value={{currentUser} }>
      {children}
    </AuthContext.Provider>
  );
};


export const useAppContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};