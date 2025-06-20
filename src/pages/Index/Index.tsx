import Register from "../../components/Register/Register";
import books from "../../assets/books.png";
import { useEffect, useState } from "react";
import Login from "../../components/Login/Login";
import { useAuthContext } from "../../hooks/useAuthContext";

const imgbooks = books;

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
    <main className="min-h-screen flex items-center justify-center">
      <section className="w-full h-[500px] flex items-center justify-center max-w-3xl mx-auto ">
        <div className="w-full max-w-md h-full flex flex-col items-center justify-center rounded-l-2xl shadow-xl border border-lightbrown">
          <div>
            <h2 className="text-4xl font-cormorant font-bold text-center text-brown">
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
        <div className="w-full bg-peach px-5 font-cormorant max-w-md h-full flex flex-col items-center justify-center rounded-r-2xl shadow-xl border border-lightbrown">
          <h2 className="text-4xl font-bold text-center text-brown mb-4">
            Organize suas leituras.
          </h2>
          <h3 className="text-xl italic text-center text-lightbrown mb-4">
            Registre e acompanhe suas leituras com facilidade.
          </h3>
          <img
            src={imgbooks}
            alt="imagem de livros empilhados"
            className="w-60"
          />
        </div>
      </section>
    </main>
  );
};

export default Index;
