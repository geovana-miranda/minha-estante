import { useContext, useState } from "react";
import Input from "../Input/Input";
import { UsersContext } from "../../context/UsersContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userContext = useContext(UsersContext);
  const authContext = useContext(AuthContext);

  if (!userContext || !authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { users } = userContext;
  const { setCurrentUser } = authContext;

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-3xl transition duration-200 cursor-pointer"
        />
      </form>
    </>
  );
};

export default Login;
