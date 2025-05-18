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
    <header className="w-4xl mx-auto py-4 px-8 flex items-center justify-between text-navy">
      <Link to="/home" className="font-bold text-2xl">
        MinhaEstante
      </Link>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Digite o título do livro"
          className="w-full italic mt-1 px-2 py-1 rounded-2xl bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value.trimStart())
          }
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-navy text-white border-none rounded-full font-bold cursor-pointer hover:bg-[#3f51b5]"
        >
          <IoMdSearch />
        </button>
      </div>
      <div className="flex items-center gap-5 font-semibold">
        <Link
          to="/editprofile"
          className="flex items-center gap-1 hover:text-[#3f51b5]"
        >
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
