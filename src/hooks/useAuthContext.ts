import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuthContext() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Contexto de usuário autenticado não encontrado. Verifique se o componente está dentro do Provider correspondente.");
  }

  return authContext;
}
