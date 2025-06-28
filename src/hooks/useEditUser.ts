import { useState } from "react";
import type { IUser } from "../types/types";
import { useAuthContext } from "./useAuthContext";
import { useUsersContext } from "./useUsersContext";

const useEditUser = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const { users, setUsers } = useUsersContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const editUser = ({
    name,
    email,
    profilePhoto,
    profileTitle,
    profileQuote,
  }: Omit<IUser, "id" | "password" | "books">) => {
    setError("");
    setSuccess("");

    if (!currentUser) return;
    if (
      name === currentUser!.name &&
      email === currentUser!.email &&
      profilePhoto === currentUser!.profilePhoto &&
      profileTitle === currentUser!.profileTitle &&
      profileQuote === currentUser!.profileQuote
    )
      return;

    if (
      users.find((user) => user.email === email && currentUser!.id !== user.id)
    ) {
      setError("Email já cadastrado");
      return false;
    }

    const editedUser: IUser = {
      ...currentUser,
      name,
      email,
      profilePhoto,
      profileTitle,
      profileQuote,
    };

    setCurrentUser(editedUser);

    setUsers([
      ...users.map((user) => (user.id === currentUser!.id ? editedUser : user)),
    ]);

    setSuccess("Perfil atualizado com sucesso");
    return true;
  };
  return { editUser, error, success };
};

export default useEditUser;
