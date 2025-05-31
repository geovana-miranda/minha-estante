import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UsersContext } from "../context/UsersContext";
import type { IUser } from "../types/types";

export const useUpdateUser = () => {
  const usersContext = useContext(UsersContext);
  const authContext = useContext(AuthContext);

  if (!usersContext || !authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser, setCurrentUser } = authContext;
  const { users, setUsers } = usersContext;

  const updateUser = (updatedUser: IUser) => {
    setCurrentUser(updatedUser);

    setUsers([
      ...users.map((user) =>
        user.id === currentUser?.id ? updatedUser : user
      ),
    ]);
  };

  return {updateUser}
};
