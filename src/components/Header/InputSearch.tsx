import type { Dispatch, SetStateAction } from "react";
import { IoMdSearch } from "react-icons/io";


interface IInputSearchProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    handleSearch: ()=> void;
}

const InputSearch = ({query, setQuery, handleSearch}: IInputSearchProps) => {
  return (
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
      <button type="submit" aria-label="Buscar"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={handleSearch}
      >
        <IoMdSearch className="text-xl" />
      </button>
    </div>
  );
};

export default InputSearch;
