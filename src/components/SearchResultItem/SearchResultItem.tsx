import type { IFoundBooks } from "../../types/types";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import ModalAddNewBook from "../ModalAddNewBook/ModalAddNewBook";

const SearchResultItem = ({ book }: { book: IFoundBooks }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="w-full flex gap-5 mb-5 bg-white rounded-xl shadow-md p-4 ">
      <div className="w-32 h-48 shrink-0">
        <img
          className="w-full object-cover"
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt="capa do livro"
        />
      </div>
      <div className="flex flex-col justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{book.volumeInfo.title}</h3>
          <p className="text-sm italic text-gray-700">
            {book.volumeInfo.subtitle}
          </p>
          <p className="text-sm font-medium text-navy">
            {book.volumeInfo.authors}
          </p>
          <p className="text-sm text-gray-600 text-justify">
            {book.volumeInfo.description?.slice(0, 200) + "..."}
          </p>
        </div>
        <button
          onClick={handleToggleModal}
          className="self-end flex items-center gap-1 px-6 py-1 bg-navy text-white border-none rounded-2xl cursor-pointer hover:bg-[#3f51b5]"
        >
          <LuPlus />
          Adicionar livro
        </button>
      </div>
      {openModal && <ModalAddNewBook handleToggleModal={handleToggleModal} book={book} />}
    </div>
  );
};

export default SearchResultItem;
