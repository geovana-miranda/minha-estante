import { useState } from "react";
import BookFormModal from "../BookModal/BookModal";
import type { IBook } from "../../types/types";
import useFavoriteBook from "../../hooks/useFavoriteBook";
import FavoriteHeart from "./FavoriteHeart";
import FavoriteStars from "./FavoriteStars";
import Thumbnail from "./Thumbnail";

const CardBook = ({ book }: { book: IBook }) => {
  const { favorited, favoriteBook } = useFavoriteBook(book);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div
      className="relative w-24 md:w-36 mb-2 flex flex-col items-center justify-center rounded-xl shadow-sm border border-gray-100 cursor-pointer"
      onClick={handleToggleModal}
    >
      {book.status === "lido" ? (
        <>
          <FavoriteHeart favorited={favorited} favoriteBook={favoriteBook} />

          <Thumbnail
            thumbnail={book.volumeInfo.imageLinks?.thumbnail}
            title={book.volumeInfo.title}
          />

          <FavoriteStars rating={book.rating} />
        </>
      ) : (
        <Thumbnail
          thumbnail={book.volumeInfo.imageLinks?.thumbnail}
          title={book.volumeInfo.title}
        />
      )}
      {openModal && (
        <BookFormModal handleToggleModal={handleToggleModal} userBook={book} />
      )}
    </div>
  );
};

export default CardBook;
