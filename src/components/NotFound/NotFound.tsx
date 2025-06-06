import { Link, useNavigate } from "react-router-dom";
import books404 from "../../assets/books2.png";
const imgBooks = books404;
import { IoArrowBackOutline } from "react-icons/io5";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-3xl flex flex-col items-center">
      <div className="flex items-center justify-around mb-10">
        <img src={imgBooks} alt="" className="w-64" />
        <div className="flex flex-col justify-center items-center font-cormorant italic font-bold text-brown">
          <h2 className="text-7xl">404</h2>
          <p className="text-5xl">Página não encontrada</p>
        </div>
      </div>
      <div>
        <button
          className="flex items-center gap-2 text-lg px-10 py-2 border border-brown bg-peach text-brown rounded-2xl font-bold cursor-pointer hover:border-lightbrown hover:text-lightbrown"
          onClick={() => navigate(-1)}
        >
          <IoArrowBackOutline />
          Voltar
        </button>
      </div>
    </div>
  );
};

export default NotFound;
