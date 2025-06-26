import Register from "../../components/Register/Register";
import { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import { useAuthContext } from "../../hooks/useAuthContext";

const Index = ({ login }: { login: boolean }) => {
  const { setCurrentUser } = useAuthContext();

  const [isLogin, setIsLogin] = useState<boolean>(login);

  useEffect(() => {
    setCurrentUser(null);
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className="min-h-screen  flex items-center justify-center">
      <section className="w-full h-[500px] bg-white flex items-center justify-center max-w-3xl mx-auto rounded-2xl shadow-2xl">
        <div className="w-full max-w-md h-full flex flex-col items-center justify-center border-r-2 border-gray-200 p-16">
          <div>
            <h2 className="text-3xl font-bold text-center ">
              {isLogin ? "Login" : "Cadastre-se"}
            </h2>
            <p className="text-sm text-center text-gray-600 mb-3">
              {isLogin ? "Não possui conta? " : "Já possui conta? "}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={toggleForm}
              >
                {isLogin ? "Cadastre-se" : "Faça login"}
              </span>
            </p>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
        <div className="w-full px-5 max-w-md h-full flex flex-col items-center justify-center gap-10">
          {" "}
          <img src="/logo.png" alt="Logo da minha estante" className="w-60" />
          <div>
            <h3 className="italic text-center mb-4">
              Registre e acompanhe suas leituras com facilidade.
            </h3>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
