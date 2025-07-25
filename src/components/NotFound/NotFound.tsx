import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useAuthContext } from "../../hooks/useAuthContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  return (
    <div className="w-76 md:w-xl lg:w-3xl mx-auto flex flex-col items-center">
      <div className="flex items-center justify-around mb-5 md:mb-10">
        <div className="flex flex-col justify-center items-center font-inter">
          <h2 className="text-3xl md:text-5xl font-bold">404</h2>
          <p className="mt-2 text-xl md:text-3xl font-semibold">Página não encontrada</p>
          <p className="mt-5 text-sm text-center md:text-base">
            Desculpe. Nós não encontramos a página que você está procurando.
          </p>
        </div>
      </div>
      {currentUser && (
        <div>
          <button
            className="flex items-center gap-2 px-10 py-1 w-full bg-blue-800 hover:bg-blue-600 text-white text-sm md:text-base rounded-3xl transition duration-200 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackOutline className="text-sm" />
            Voltar
          </button>
        </div>
      )}
    </div>
  );
};

export default NotFound;
