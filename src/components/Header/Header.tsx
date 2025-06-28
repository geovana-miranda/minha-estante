import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { useState } from "react";
import InputSearch from "./InputSearch";

const Header = () => {
  const [query, setQuery] = useState<string>("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <header className="w-4xl mx-auto py-2 my-3 px-8 flex items-center justify-between shadow bg-white rounded-4xl">
      <Link to="/home">
        <img src="/logo.png" alt="logo da minha estante" className="w-32" />
      </Link>

      <InputSearch
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />

      <div className="flex items-center gap-5">
        <Link
          to="/editprofile"
          className="flex items-center gap-1 hover:text-blue-800 transition duration-200"
        >
          <span className="font-semibold">Editar perfil</span>
          <MdOutlineEdit className="text-xl" />
        </Link>

        <Link
          to="/"
          className="flex items-center gap-1 hover:text-blue-800 transition duration-200"
        >
          <span className="font-semibold">Sair</span>
          <IoExitOutline className="text-2xl"/>
        </Link>
      </div>
    </header>
  );
};

export default Header;
