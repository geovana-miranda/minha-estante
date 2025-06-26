import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";

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

      <div className="relative">
        <input
          type="text"
          placeholder="Digite o título do livro"
          className="w-full italic mt-1 pl-4 pr-10 py-1 text-sm rounded-2xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={query}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleSearch();
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value.trimStart())
          }
        />
        <span
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-800"
          onClick={handleSearch}
        >
          <IoMdSearch className="text-xl" />
        </span>
      </div>

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
          <IoExitOutline className="text-2xl" title="Sair" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
