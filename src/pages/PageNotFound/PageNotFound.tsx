import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Header from "../../components/Header/Header";
import NotFound from "../../components/NotFound/NotFound";
import Section from "../../components/Section/Section";

const PageNotFound = () => {
  const { currentUser } = useAuthContext();

  return (
    <>
      {currentUser ? (
        <Header />
      ) : (
        <header className="w-84 md:w-2xl lg:w-4xl mx-auto py-2 my-3 px-8 flex items-center justify-between shadow bg-white rounded-4xl">
          <Link to="/home">
            <img src="/logo.png" alt="logo da minha estante" className="w-22 md:w-32" />
          </Link>

          <div className="flex items-center gap-2 md:gap-5">
            <Link to="/" className="flex items-center gap-1 hover:text-blue-800 transition duration-200">
              <span className="font-semibold text-xs md:text-lg">Cadastre-se</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-blue-800 transition duration-200"
            >
              <span className="font-semibold text-xs md:text-lg">Login</span>
            </Link>
          </div>          
        </header>
      )}
      <Section>
        <NotFound />
      </Section>
    </>
  );
};

export default PageNotFound;
