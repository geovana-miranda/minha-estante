import { v4 as uuidv4 } from "uuid";
import semfoto from "../assets/semfoto.png";
import type { IUser } from "../types/types";
import { useUsersContext } from "./useUsersContext";
import { useState } from "react";
const imgsemfoto = semfoto;

const useCreateUser = () => {
  const { users, setUsers } = useUsersContext();
  const [error, setError] = useState("");

  const createUser = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (users.find((user) => email === user.email)) {
      setError("Email já cadastrado");
      return false;
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return false;
    }

    const newUser: IUser = {
      id: uuidv4(),
      name,
      email,
      password,
      profilePhoto: imgsemfoto,
      profileTitle: "Minha estante",
      profileQuote:
        "A leitura abre a mente, impulsiona sonhos e alimenta a alma. Érico Teixeira.",
      books: [],
    };

    setError("");
    setUsers([...users, newUser]);
    return true;
  };
  return { createUser, error };
};

export default useCreateUser;
