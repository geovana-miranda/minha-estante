import { useContext, useEffect, useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import ModalAddNewBook from "../ModalAddNewBook/ModalAddNewBook";
import type { IBook, IUser } from "../../types/types";

const CardBook = ({ book }: { book: IBook }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser } = authContext;
  const { updateUser } = useUpdateUser();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [favoritedBook, setFavoritedBook] = useState<boolean>(
    book.favorite || false
  );

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const getStarColor = (star: number) => {
    if (book.rating) {
      return star <= book.rating ? "text-amber-400" : "text-gray-400";
    }

    return "text-gray-400";
  };

  const favoriteBook = (
    e: React.MouseEvent<SVGElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    setFavoritedBook(!favoritedBook);
  };

  const updateBook = () => {
    if (!currentUser) return;

    const updatedBook = { ...book, favorite: favoritedBook };

    const updatedUser: IUser = {
      ...currentUser,
      books: [
        ...currentUser.books.map((b) => (b.id === book.id ? updatedBook : b)),
      ],
    };

    updateUser(updatedUser);
  };

  useEffect(() => {
    updateBook();
  }, [favoritedBook]);

  return (
    <div
      className="relative w-40 h-60 mb-2 flex flex-col items-center justify-center bg-peach rounded-xl shadow-lg border border-[#b4955e] cursor-pointer"
      onClick={handleToggleModal}
    >
      {book.status === "lido" && (
        <div className="absolute top-1 right-3 text-gray-300 cursor-pointer">
          <FaHeart
            className={`text-3xl ${
              favoritedBook ? "text-red-600" : "text-gray-400"
            }`}
            onClick={(e) => favoriteBook(e)}
          />
        </div>
      )}

      <div className="w-32 h-44 my-2 shrink-0">
        <img
          className="w-full object-cover"
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={`Capa do livro ${book.volumeInfo.title}`}
        />
      </div>

      {book.status === "lido" && (
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
