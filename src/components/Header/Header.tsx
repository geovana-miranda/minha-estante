import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="w-4xl mx-auto py-4 px-8 flex items-center justify-between text-navy">
      <Link to="/home" className="font-bold text-2xl">MinhaEstante</Link>
      <div className="flex items-center gap-5 font-semibold">
        <Link to="/editprofile" className="flex items-center gap-1 hover:text-[#3f51b5]">
          <span>Editar perfil</span>
          <MdOutlineEdit />
        </Link>
        <Link to="/" className="flex items-center gap-1 hover:text-[#3f51b5]">
          <span>Sair</span>
          <IoExitOutline />
        </Link>
      </div>
    </header>
  );
};

export default Header;
