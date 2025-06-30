import type { IGoogleBook, typeStatus } from "../../types/types";
import { useEffect, useState } from "react";
import BookFormModal from "../BookModal/BookModal";
import { useNavigate } from "react-router-dom";
import BookActionButton from "../BookActionButton/BookActionButton";
import { useAuthContext } from "../../hooks/useAuthContext";

const SearchResultItem = ({ apiBook }: { apiBook: IGoogleBook }) => {
  const { currentUser } = useAuthContext();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [bookStatus, setBookStatus] = useState<typeStatus | null>(null);
  const userBook = currentUser?.books.find((b) => b.id === apiBook.id) ?? undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (userBook) {
      setBookStatus(userBook.status as typeStatus);
    }
  }, [currentUser, userBook]);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const displayBookDetails = () => {
    navigate(`/book/${apiBook.id}`);
  };

  return (
    <div
      className="w-full flex gap-5 mb-3 rounded-2xl shadow-sm p-4 cursor-pointer border border-gray-200"
      onClick={displayBookDetails}
    >
      <div className="w-24 h-36 shrink-0">
        <img
          className="w-24 h-36 object-cover"
          src={apiBook.volumeInfo.imageLinks?.thumbnail}
          alt={`Capa do livro ${apiBook.volumeInfo.title}`}
        />
      </div>
      <div className="w-full flex flex-col justify-between items-start">
        <div>
          <h3 className="font-lg font-bold">{apiBook.volumeInfo.title}</h3>
          <p className="italic text-gray-600 mb-1">
            {apiBook.volumeInfo.subtitle}
          </p>
          {apiBook.volumeInfo.authors?.map((author, index) => (
            <span key={index} className="text-sm text-gray-600 mb-2">
              {author}{" "}
            </span>
          ))}
          <p className="text-sm my-2 line-clamp-4">
            {apiBook.volumeInfo.description}
          </p>
        </div>

        <div className="self-end w-36">
          <BookActionButton
            bookStatus={bookStatus}
            handleToggleModal={handleToggleModal}
          />
        </div>
      </div>

      {openModal && (
        <BookFormModal
          handleToggleModal={handleToggleModal}
          userBook={userBook ? userBook : undefined}
          apiBook={apiBook ? apiBook : undefined}
        />
      )}
    </div>
  );
};

export default SearchResultItem;
