import type { IBook, IGoogleBook, typeStatus } from "../../types/types";
import { useEffect, useState } from "react";
import BookFormModal from "../BookFormModal/BookFormModal";
import { useNavigate } from "react-router-dom";
import BookActionButton from "../BookActionButton/BookActionButton";
import { useAuth } from "../../hooks/useAuth";

const SearchResultItem = ({ apiBook }: { apiBook: IGoogleBook }) => {
  const { currentUser } = useAuth();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [bookStatus, setBookStatus] = useState<typeStatus | null>(null);
  const userBook = currentUser?.books.find((b) => b.id === apiBook.id) as IBook;

  useEffect(() => {
    const updatedStatus = currentUser?.books.find(
      (b) => b.id === apiBook.id
    ) as IBook;

    if (updatedStatus) {
      setBookStatus(updatedStatus.status as typeStatus);
    } else {
      setBookStatus(null);
    }
  }, [currentUser]);

  const navigate = useNavigate();

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (userBook) {
      setBookStatus(userBook.status as typeStatus);
    }
  }, []);

  const displayBookDetails = () => {
    navigate(`/book/${apiBook.id}`);
  };

  return (
    <div
      className="w-full flex gap-5 mb-5 bg-peach rounded-xl shadow-md p-4 cursor-pointer border border-lightbrown"
      onClick={displayBookDetails}
    >
      <div className="w-36 h-56 shrink-0">
        <img
          className="w-36 h-52 object-cover"
          src={apiBook.volumeInfo.imageLinks?.thumbnail}
          alt={`Capa do livro ${apiBook.volumeInfo.title}`}
        />
      </div>
      <div className="flex flex-col justify-between items-start">
        <div>
          <h3 className="text-2xl font-cormorant font-bold text-brown">
            {apiBook.volumeInfo.title}
          </h3>
          <p className="text-lg font-cormorant italic text-lightbrown mb-1">
            {apiBook.volumeInfo.subtitle}
          </p>
          {apiBook.volumeInfo.authors?.map((author) => (
            <span key={apiBook.volumeInfo.authors?.indexOf(author)} className="text-sm font-medium text-gray-600 mb-2">{author}{" "}</span>
          ))}
          <p className="text-brown text-justify">
            {apiBook.volumeInfo.description?.slice(0, 200) + "..."}
          </p>
        </div>

        <div className="self-end w-52">
          <BookActionButton
            bookStatus={bookStatus}
            handleToggleModal={handleToggleModal}
          />
        </div>
      </div>

      {openModal &&
        (userBook ? (
          <BookFormModal
            handleToggleModal={handleToggleModal}
            userBook={userBook}
          />
        ) : (
          <BookFormModal
            handleToggleModal={handleToggleModal}
            apiBook={apiBook}
          />
        ))}
    </div>
  );
};

export default SearchResultItem;
