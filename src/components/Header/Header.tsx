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
    <header className="w-4xl mx-auto py-3 mb-3 px-4 flex items-center justify-between text-brown border-b-2 border-lightbrown">
      <Link to="/home" className="font-bold font-cormorant text-3xl">
        MinhaEstante
      </Link>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Digite o título do livro"
          className="w-full italic mt-1 px-2 py-1 rounded-2xl bg-white border border-brown-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={query}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleSearch();
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value.trimStart())
          }
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-brown text-white border-none rounded-full font-bold cursor-pointer hover:bg-lightbrown"
        >
          <IoMdSearch />
        </button>
      </div>
      <div className="flex items-center gap-5 italic font-bold font-cormorant text-xl">
        <Link
          to="/editprofile"
          className="flex items-center gap-1 hover:text-lightbrown"
        >
          <span>Editar perfil</span>
          <MdOutlineEdit />
        </Link>

        <Link
          to="/"
          className="flex items-center gap-1 border py-1 px-4 bg-peach rounded-4xl hover:text-lightbrown"
        >
          <IoExitOutline />
          <span>Sair</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
