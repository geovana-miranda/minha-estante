import { useState } from "react";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUsersContext } from "../../hooks/useUsersContext";
import SubmitButton from "../SubmitButton/SubmitButton";

const Login = () => {
  const { users } = useUsersContext();
  const { setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const existingUser = users.find((user) => user.email === email);

    if (!existingUser) {
      return setError("Email não cadastrado");
    }

    if (existingUser.password !== password) {
      return setError("Senha incorreta");
    }

    setCurrentUser(existingUser);
    navigate("/home");
  };

  return (
    <>
      {error && (
        <div className=" border-none py-2 px-5 bg-[#ffbbbb] rounded-3xl">
          <p className="text-sm text-center text-[#ff0000]">{error}</p>
        </div>
      )}

      <form className="flex flex-col mt-2 w-full" onSubmit={handleSubmit}>
        <Input
          label="Email:"
          type="email"
          placeholder="Digite seu email..."
          value={email}
          setValue={setEmail}
        />
        <Input
          label="Senha:"
          type="password"
          placeholder="Digite sua senha..."
          value={password}
          setValue={setPassword}
        />
        <SubmitButton value="Entrar" />
      </form>
    </>
  );
};

export default Login;
