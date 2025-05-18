import type { IFoundBooks } from "../../types/types";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import ModalAddNewBook from "../ModalAddNewBook/ModalAddNewBook";
import { useNavigate } from "react-router-dom";

const SearchResultItem = ({ book }: { book: IFoundBooks }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const displayBookDetails = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div
      className="w-full flex gap-5 mb-5 bg-white rounded-xl shadow-md p-4 cursor-pointer"
      onClick={displayBookDetails}
    >
      <div className="w-32 h-48 shrink-0">
        <img
          className="w-full object-cover"
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={`Capa do livro ${book.volumeInfo.title}`}
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
          onClick={(e) => {
            e.stopPropagation();
            handleToggleModal();
          }}
          className="self-end flex items-center gap-1 px-6 py-1 bg-navy text-white border-none rounded-2xl cursor-pointer hover:bg-[#3f51b5]"
        >
          <LuPlus />
          Adicionar livro
        </button>
      </div>
      {openModal && (
        <ModalAddNewBook handleToggleModal={handleToggleModal} book={book} />
      )}
    </div>
  );
};

export default SearchResultItem;
