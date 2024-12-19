import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "../../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

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
  currentUserProducts: any[];
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentUserProducts, setCurrentUserProducts] = useState<any[]>([]);

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
          setCurrentUser({ ...doc.data(), id: doc.id } as User);
        });
      });
    }
  }

  async function fetchUserProducts() {
    const q = query(
      collection(firestore, "products"),
      where("userId", "==", doc(firestore, "users", currentUser?.id)),
    );
    onSnapshot(q, (querySnapshot) => {
      const p = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCurrentUserProducts(p);
    });
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

  useEffect(() => {
    if (currentUser) {
      fetchUserProducts();
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, currentUser, currentUserProducts }}
    >
      {children}
    </AuthContext.Provider>
  );
}
