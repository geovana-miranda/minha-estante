import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

export function useUsersContext() {
  const usersContext = useContext(UsersContext);

  if (!usersContext) {
    throw new Error("Contexto de usuários não encontrado. Verifique se o componente está dentro do Provider correspondente.");
  }

  return usersContext;
}
