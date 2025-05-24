import { useState } from "react";
import type { IBook } from "../../types/types";
import { FaStar } from "react-icons/fa";
import ModalAddNewBook from "../ModalAddNewBook/ModalAddNewBook";

const CardBook = ({ book }: { book: IBook }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const getStarColor = (star: number) => {
    if (book.rating) {
      return star <= book.rating ? "text-amber-300" : "text-gray-300";
    }
  };
  return (
    <div className="w-44 h-64 mb-2 flex flex-col items-center justify-center rounded-xl shadow-xl border border-gray-200 cursor-pointer" onClick={handleToggleModal}>
      <div className="w-32 h-48 shrink-0">
        <img
          className="w-full object-cover"
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={`Capa do livro ${book.volumeInfo.title}`}
        />
      </div>
      {book.rating && (
        <div className="w-32 flex mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className={`text-3xl ${getStarColor(star)}`} />
          ))}
        </div>
      )}
      {openModal && (
        <ModalAddNewBook
          handleToggleModal={handleToggleModal}
          userBook={book}
        />
      )}
    </div>
  );
};

export default CardBook;
