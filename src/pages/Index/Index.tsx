import Register from "../../components/FormUser/Register";
import { useEffect, useState } from "react";
import Login from "../../components/FormUser/Login";
import { useAuthContext } from "../../hooks/useAuthContext";
import FormContainer from "./FormContainer";

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
      <section className="w-84 h-auto py-8 md:py-0 md:w-xl lg:w-full lg:h-[500px] bg-white flex flex-col md:flex-row items-center justify-center max-w-3xl mx-auto rounded-2xl shadow-2xl">
        <div className="mb-8 md:hidden">
          <img src="/logo.png" alt="Logo da minha estante" className="w-40" />
        </div>
        <div className="w-full max-w-md h-full flex flex-col items-center justify-center md:py-10 lg:py-0 md:border-r-2 md:border-gray-200">
          <FormContainer isLogin={isLogin} toggleForm={toggleForm}>
            {isLogin ? <Login /> : <Register />}
          </FormContainer>
        </div>
        <div className="hidden md:w-full md:max-w-md md:h-full md:flex md:flex-col md:items-center md:justify-center md:gap-10">
          <img src="/logo.png" alt="Logo da minha estante" className="w-52 lg:w-60" />
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
