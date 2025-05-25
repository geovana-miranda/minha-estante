import { useContext, useState, type MouseEvent } from "react";
import type { IBook, IUser } from "../../types/types";
import { FaStar, FaHeart } from "react-icons/fa";
import ModalAddNewBook from "../ModalAddNewBook/ModalAddNewBook";
import { UsersContext } from "../../context/UsersContext";
import { AuthContext } from "../../context/AuthContext";

const CardBook = ({ book }: { book: IBook }) => {
  const usersContext = useContext(UsersContext);
  const authContext = useContext(AuthContext);

  if (!usersContext || !authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser, setCurrentUser } = authContext;
  const { users, setUsers } = usersContext;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const favoritedBook  = 
    book.favorite || false
  ;

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const getStarColor = (star: number) => {
    if (book.rating) {
      return star <= book.rating ? "text-amber-300" : "text-gray-300";
    }
  };

  const favoriteBook = (e: React.MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    if (!currentUser) return;

    const updatedBook = { ...book, favorite: !favoritedBook };

    const updatedUser: IUser = {
      ...currentUser,
      books: [
        ...currentUser.books.map((b) => (b.id === book.id ? updatedBook : b)),
      ],
    };

    setCurrentUser(updatedUser);

    setUsers([
      ...users.map((user) => (user.id === currentUser.id ? updatedUser : user)),
    ]);
  };
  return (
    <div
      className="relative w-44 h-64 mb-2 flex flex-col items-center justify-center rounded-xl shadow-xl border border-gray-200 cursor-pointer"
      onClick={handleToggleModal}
    >
      <div className="absolute top-1 right-3 text-gray-300 cursor-pointer">
        <FaHeart
          className={`text-3xl ${
            favoritedBook ? "text-red-600" : "text-gray-300"
          }`}
          onClick={(e) => favoriteBook(e)}
        />
      </div>
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
