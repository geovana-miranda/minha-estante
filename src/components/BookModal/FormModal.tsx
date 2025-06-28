import { useEffect, useState } from "react";
import type { IBook, typeStatus } from "../../types/types";
import FormAddNewBook from "../FormAddNewBook/FormAddNewBook";
import { useNavigate } from "react-router-dom";
import ButtonsModal from "./ButtonsModal";

interface IFormModalProps {
  book: IBook;
  handleDeleteBook: () => void;
  isEditMode: boolean;
  handleToggleModal: () => void;
  handleSaveBook: (
    status: typeStatus,
    rating: number | null,
    review: string
  ) => void;
}

const FormModal = ({
  book,
  handleDeleteBook,
  isEditMode,
  handleToggleModal,
  handleSaveBook,
}: IFormModalProps) => {
  const [markedAsRead, setMarkedAsRead] = useState<boolean>(false);
  const [status, setStatus] = useState<typeStatus>(
    (book.status as typeStatus) || "queroler"
  );
  const [rating, setRating] = useState<number | null>(book.rating || null);
  const [review, setReview] = useState<string>(book.review || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "lido") {
      return setMarkedAsRead(true);
    } else {
      return setMarkedAsRead(false);
    }
  }, [status]);

  const displayBookDetails = () => {
    navigate(`/book/${book.id}`);
  };

  const handleSubmit = () => {
    handleSaveBook(status, rating, review);
  };

  return (
    <>
      <div className="flex justify-center gap-8">
        <div className="shrink-0">
          <img
            className="w-36 h-auto shadow-md cursor-pointer"
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt="capa do livro"
            onClick={displayBookDetails}
          />
        </div>
        <div className="w-full  flex flex-col gap-2">
          <div>
            <p className="text-lg font-bold">{book.volumeInfo.title} </p>
            <p className="text-sm text-gray-600 italic">
              {book.volumeInfo.authors}
            </p>
          </div>
          <div>
            <label className="mr-2 font-bold">Status:</label>
            <select
              defaultValue={status}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-32 mt-1 py-2 px-4 rounded-full bg-peach border border-gray-600"
              onChange={(e) => {
                if (e.target.value === "lido") {
                  setStatus("lido");
                } else {
                  setStatus("queroler");
                }
              }}
            >
              <option value="queroler">Quero ler</option>
              <option value="lido">Lido</option>
            </select>
          </div>
          {markedAsRead && (
            <FormAddNewBook
              rating={rating}
              setRating={setRating}
              review={review}
              setReview={setReview}
            />
          )}
          {isEditMode && (
            <button
              className="text-start text-sm text-[#9e0101] underline cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBook();
              }}
            >
              Remover da sua estante
            </button>
          )}
        </div>
      </div>
      <ButtonsModal
        handleToggleModal={handleToggleModal}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default FormModal;
