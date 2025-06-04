import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { IUser } from "../types/types";

interface IAuthContext {
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedCurrentUser = localStorage.getItem("usuario");

    if (savedCurrentUser) {
      setCurrentUser(JSON.parse(savedCurrentUser));
    } else {
      setCurrentUser(null);
    }
     setLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("usuario", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
