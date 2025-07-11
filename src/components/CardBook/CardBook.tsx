import { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import BookFormModal from "../BookModal/BookModal";
import type { IBook } from "../../types/types";
import useFavoriteBook from "../../hooks/useFavoriteBook";

const CardBook = ({ book }: { book: IBook }) => {
  const { favorited, favoriteBook } = useFavoriteBook(book);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const getStarColor = (star: number) => {
    if (book.rating) {
      return star <= book.rating ? "text-amber-400" : "text-gray-400";
    }
    return "text-gray-400";
  };

  return (
    <div
      className="relative w-24 md:w-36 mb-2 flex flex-col items-center justify-center rounded-xl shadow-sm border border-gray-100 cursor-pointer"
      onClick={handleToggleModal}
    >
      {book.status === "lido" ? (
        <>
          <div className="absolute top-0 right-2 text-gray-300 cursor-pointer">
            <FaHeart
              className={`text-2xl md:text-3xl ${
                favorited ? "text-red-600" : "text-gray-400"
              }`}
              onClick={(e) => favoriteBook(e)}
            />
          </div>

          <div className="w-20 h-32 md:w-28 md:h-42 mt-3 shrink-0">
            {!book.volumeInfo.imageLinks?.thumbnail ? (
              <img
                className="border h-40 border-gray-200 object-cover"
                src="/semcapa.jpg"
                alt={`Capa do livro ${book.volumeInfo.title}`}
              />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={`Capa do livro ${book.volumeInfo.title}`}
              />
            )}
          </div>
          <div className="w-20 md:w-28 flex md:my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className={`text-3xl ${getStarColor(star)}`} />
            ))}
          </div>
        </>
      ) : (
        <div className="w-20 h-32 md:w-28 md:h-42 my-2 shrink-0 flex flex-col justify-center">
          {!book.volumeInfo.imageLinks?.thumbnail ? (
              <img
                className="border h-40 border-gray-200  object-cover"
                src="/semcapa.jpg"
                alt={`Capa do livro ${book.volumeInfo.title}`}
              />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={`Capa do livro ${book.volumeInfo.title}`}
              />
            )}
        </div>
      )}
      {openModal && (
        <BookFormModal handleToggleModal={handleToggleModal} userBook={book} />
      )}
    </div>
  );
};

export default CardBook;
