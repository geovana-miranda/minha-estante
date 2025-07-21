import { useState } from "react";
import { useUsersContext } from "./useUsersContext";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { users } = useUsersContext();
  const { setCurrentUser } = useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const existingUser = users.find((user) => user.email === email);

    if (!existingUser || existingUser.password !== password) {
      setError("Email ou senha estão incorretos");
      return false;
    }

    setCurrentUser(existingUser);
    setError("");
    navigate("/home");

    return true;
  };

  return { login, error };
};

export default useLogin;
