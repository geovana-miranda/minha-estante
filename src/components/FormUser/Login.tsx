import { useState } from "react";
import Input from "./Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormUser from "./FormUser";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { login, error } = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const logged  = login(email, password);
    if (!logged ) return;
  };

  return (
    <>
      {error && (
        <div className=" border-none py-2 px-5 bg-[#ffbbbb] rounded-3xl">
          <p className="text-sm text-center text-[#ff0000]">{error}</p>
        </div>
      )}

      <FormUser handleSubmit={handleSubmit}>
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
      </FormUser>
    </>
  );
};

export default Login;
