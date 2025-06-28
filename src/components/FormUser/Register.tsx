import { useState } from "react";
import Input from "./Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormUser from "./FormUser";
import useCreateUser from "../../hooks/useCreateUser";

const Register = () => {
  const { createUser, error } = useCreateUser();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdUser = createUser(name, email, password, confirmPassword);
    if (!createdUser) return;
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
          label="Nome:"
          type="text"
          placeholder="Digite seu nome..."
          value={name}
          setValue={setName}
        />
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
        <Input
          label="Confirme sua senha:"
          type="password"
          placeholder="Confirme sua senha..."
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <SubmitButton value="Cadastrar" />
      </FormUser>
    </>
  );
};

export default Register;
