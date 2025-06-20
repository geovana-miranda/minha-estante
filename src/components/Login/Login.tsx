import { useState } from "react";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUsersContext } from "../../hooks/useUsersContext";

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

      <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
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
        <input
          type="submit"
          value="Entrar"
          className="mt-3 w-full bg-brown hover:bg-lightbrown text-white font-medium py-2 rounded-3xl transition duration-200 cursor-pointer"
        />
      </form>
    </>
  );
};

export default Login;
