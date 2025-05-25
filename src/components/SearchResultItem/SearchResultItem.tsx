import type { IBook, IGoogleBook, typeStatus } from "../../types/types";
import { LuPlus } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import ModalAddNewBook from "../ModalAddNewBook/ModalAddNewBook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { HiCheck } from "react-icons/hi";

const SearchResultItem = ({ apiBook }: { apiBook: IGoogleBook }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser } = authContext;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [bookStatus, setBookStatus] = useState<typeStatus | null>(null);
  const userBook = currentUser?.books.find((b) => b.id === apiBook.id) as IBook;

  const navigate = useNavigate();

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (userBook) {
      setBookStatus(userBook.status as typeStatus);
    }
  }, []);

  const getStatusColor = (bookStatus: typeStatus) => {
    if (bookStatus === "lido") {
      return `bg-green-700`;
    } else {
      return `bg-yellow-400`;
    }
  };

  const displayBookDetails = () => {
    navigate(`/book/${apiBook.id}`);
  };

  return (
    <div
      className="w-full flex gap-5 mb-5 bg-white rounded-xl shadow-md p-4 cursor-pointer"
      onClick={displayBookDetails}
    >
      <div className="w-32 h-48 shrink-0">
        <img
          className="w-full object-cover"
          src={apiBook.volumeInfo.imageLinks?.thumbnail}
          alt={`Capa do livro ${apiBook.volumeInfo.title}`}
        />
      </div>
      <div className="flex flex-col justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{apiBook.volumeInfo.title}</h3>
          <p className="text-sm italic text-gray-700">
            {apiBook.volumeInfo.subtitle}
          </p>
          <p className="text-sm font-medium text-navy">
            {apiBook.volumeInfo.authors}
          </p>
          <p className="text-sm text-gray-600 text-justify">
            {apiBook.volumeInfo.description?.slice(0, 200) + "..."}
          </p>
        </div>

        {bookStatus ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleModal();
            }}
            className={`self-end flex items-center gap-1 border-none cursor-pointer px-4 py-1 rounded-full text-sm text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition" ${getStatusColor(
              bookStatus
            )}`}
          >
            <HiCheck />
            {bookStatus === "lido" ? "Lido" : "Quero ler"}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleModal();
            }}
            className="self-end flex items-center gap-1 px-6 py-1 bg-navy text-white border-none cursor-pointer  rounded-full text-sm shadow hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            <LuPlus />
            Adicionar livro
          </button>
        )}
      </div>

      {openModal &&
        (userBook ? (
          <ModalAddNewBook
            handleToggleModal={handleToggleModal}
            userBook={userBook}
          />
        ) : (
          <ModalAddNewBook
            handleToggleModal={handleToggleModal}
            apiBook={apiBook}
          />
        ))}
    </div>
  );
};

export default SearchResultItem;
