import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "../../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextData {
  user: User;
  setUser: (user: User) => void;
  signIn: (email: string, password: string) => void;
  currentUser: User;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [currentUser, setCurrentUser] = useState<User>();

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  function getUser() {
    if (user) {
      const q = query(
        collection(firestore, "users"),
        where("email", "==", user.email),
      );
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCurrentUser(doc.data() as User);
        });
      });
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u as any);
      }
      if (!u) {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
