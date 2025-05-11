import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../Input/Input";
import type { IUser } from "../../types/types";
import { UsersContext } from "../../context/UsersContext";

import semfoto from "../../assets/semfoto.png";
const imgsemfoto = semfoto;

const Register = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }
  const { users, setUsers } = context;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (users.find((user) => email === user.email)) {
      setError("Email já cadastrado");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    createUser();
    resetForm();
  };

  const createUser = () => {
    const newUser: IUser = {
      id: uuidv4(),
      name,
      email,
      password,
      profilePhoto: imgsemfoto,
      profileTitle: "Minha estante",
      profileQuote:
        "A leitura abre a mente, impulsiona sonhos e alimenta a alma. Érico Teixeira.",
    };

    setUsers([...users, newUser]);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
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
        <input
          type="submit"
          value="Cadastrar"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-3xl transition duration-200 cursor-pointer"
        />
      </form>
    </>
  );
};

export default Register;
