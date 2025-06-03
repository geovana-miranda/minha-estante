import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  return authContext;
}
