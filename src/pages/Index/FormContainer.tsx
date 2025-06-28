interface IFormContainerProps {
  isLogin: boolean;
  toggleForm: () => void;
  children: React.ReactNode;
}

const FormContainer = ({
  isLogin,
  toggleForm,
  children,
}: IFormContainerProps) => {
  return (
    <>
      <div >
        <h2 className="text-3xl font-bold text-center ">
          {isLogin ? "Login" : "Cadastre-se"}
        </h2>
        <p className="text-sm text-center text-gray-600 mb-3">
          {isLogin ? "Não possui conta? " : "Já possui conta? "}
          <a
            href="#"
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={toggleForm}
          >
            {isLogin ? "Cadastre-se" : "Faça login"}
          </a>
        </p>
      </div>
      {children}
    </>
  );
};

export default FormContainer;
