import type { Dispatch, SetStateAction } from "react";
import type { typeDisplayBooks } from "../../types/types";

interface IFilterBooksSelectProps {
  setDisplayBooks: Dispatch<SetStateAction<typeDisplayBooks>>;
}

const FilterBooksSelect = ({ setDisplayBooks }: IFilterBooksSelectProps) => {
  return (
    <div className="flex items-center gap-3 md:gap-5 my-6 mx-auto">
      <span className="md:text-lg font-bold">Exibir: </span>
      <select
        className="w-32 md:py-1 px-3 rounded-full border border-gray-300"
        onChange={(e) => {
          setDisplayBooks(e.target.value as typeDisplayBooks);
        }}
      >
        <option value="lido">Lidos</option>
        <option value="queroler">Quero ler</option>
        <option value="favoritos">Favoritos</option>
      </select>
    </div>
  );
};

export default FilterBooksSelect;
