import { Link } from "react-router-dom";
import books404 from "../../assets/books2.png";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import Header from "../../components/Header/Header";
const imgBooks = books404;

const PageNotFound = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      {currentUser ? (
        <Header />
      ) : (
        <header className="w-4xl mx-auto py-3 mb-3 px-4 flex items-center justify-between text-brown border-b-2 border-lightbrown">
          <Link to="/" className="font-bold font-cormorant text-3xl">
            MinhaEstante
          </Link>
          <div className="flex items-center gap-5 italic font-bold font-cormorant text-xl">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-lightbrown"
            >
              <span>Cadastre-se</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1 border py-1 px-4 bg-peach rounded-4xl hover:text-lightbrown"
            >
              <span>Login</span>
            </Link>
          </div>
        </header>
      )}
      <div className="w-4xl flex gap-5 mb-5 border border-lightbrown rounded-xl shadow-md p-8 mx-auto">
        <div className="w-3xl my-10 flex flex-col justify-center items-center mx-auto ">
          <div className="flex items-center justify-around mb-10">
            <img src={imgBooks} alt="" className="w-64" />
            <div className="flex flex-col justify-center items-center font-cormorant italic font-bold text-brown">
              <h2 className="text-7xl">404</h2>
              <p className="text-5xl">Página não encontrada</p>
            </div>
          </div>
          {currentUser && (
            <Link
              to="/home"
              className="text-lg px-16 py-3 border border-brown bg-peach text-brown rounded-2xl font-bold cursor-pointer hover:border-lightbrown hover:text-lightbrown"
            >
              Voltar para estante
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
