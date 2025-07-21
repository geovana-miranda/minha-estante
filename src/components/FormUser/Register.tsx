import Input from "./Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormUser from "./FormUser";
import useCreateUser from "../../hooks/useCreateUser";
import { useForm } from "react-hook-form";

interface IFormInputTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { createUser, error, success } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IFormInputTypes>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const submitForm = ({
    name,
    email,
    password,
  }: Omit<IFormInputTypes, "confirmPassword">) => {
    const createdUser = createUser(name, email, password);
    if (!createdUser) return;
    reset();
  };

  return (
    <>
      {success && (
        <div className="border-none py-2 px-5 mb-3 bg-[#bbffbe] rounded-3xl">
          <p className="text-sm text-center text-[#00bb00]">{success}</p>
        </div>
      )}

      <FormUser onSubmit={handleSubmit(submitForm)}>
        <Input
          label="Nome:"
          type="text"
          placeholder="Digite seu nome..."
          error={errors.name?.message}
          {...register("name", {
            required: "O campo de nome é obrigatório",
            minLength: {
              value: 3,
              message: "O nome deve ter pelo menos 3 caracteres",
            },
          })}
        />

        <Input
          label="Email:"
          type="email"
          placeholder="Digite seu email..."
          error={error || errors.email?.message}
          {...register("email", { required: "O campo de email é obrigatório" })}
        />

        <Input
          label="Senha:"
          type="password"
          placeholder="Digite sua senha..."
          error={errors.password?.message}
          {...register("password", {
            required: "O campo de senha é obrigatório",
            minLength: {
              value: 5,
              message: "A senha deve ter pelo menos 5 caracteres",
            },
          })}
        />

        <Input
          label="Confirme sua senha:"
          type="password"
          placeholder="Confirme sua senha..."
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "O campo de confirmar senha é obrigatório",
            minLength: {
              value: 5,
              message: "A senha deve ter pelo menos 5 caracteres",
            },
            validate: (confirmPassword: string) =>
              confirmPassword === password || "As senhas são diferentes",
          })}
        />

        <SubmitButton value="Cadastrar" />
      </FormUser>
    </>
  );
};

export default Register;
