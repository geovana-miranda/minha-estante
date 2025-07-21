import Input from "./Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormUser from "./FormUser";
import useLogin from "../../hooks/useLogin";
import { useForm } from "react-hook-form";

interface IFormInputTypes {
  email: string;
  password: string;
}

const Login = () => {
  const { login, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputTypes>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitForm = (data: IFormInputTypes) => {
    const logged = login(data.email, data.password);
    if (!logged) return;
    reset();
  };

  return (
    <>
      <FormUser onSubmit={handleSubmit(submitForm)}>
        <Input
          label="Email:"
          type="email"
          placeholder="Digite seu email..."
          error={error || errors.email?.message}
          {...register("email", { required: "Por favor, insira o seu email" })}
        />
        <Input
          label="Senha:"
          type="password"
          placeholder="Digite sua senha..."
          error={error || errors.password?.message}
          {...register("password", {
            required: "Por favor, insira a sua senha",
          })}
        />
        <SubmitButton value="Entrar" />
      </FormUser>
    </>
  );
};

export default Login;
