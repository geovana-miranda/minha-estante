import { Link } from "react-router-dom";
import books404 from "../../assets/books2.png";
const imgBooks = books404;

const NotFound = () => {
  return (
    <div className="w-3xl text-center">
      <div className="flex items-center justify-around mb-10">
        <img src={imgBooks} alt="" className="w-64" />
        <div className="flex flex-col justify-center items-center font-cormorant italic font-bold text-brown">
          <h2 className="text-7xl">404</h2>
          <p className="text-5xl">Página não encontrada</p>
        </div>
      </div>
      <Link to="/home" className="text-lg px-16 py-3 border border-brown bg-peach text-brown rounded-2xl font-bold cursor-pointer hover:border-lightbrown hover:text-lightbrown">Voltar para estante</Link>
    </div>
  );
};

export default NotFound;
