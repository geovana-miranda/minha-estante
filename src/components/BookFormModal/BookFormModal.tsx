import { useEffect, useState } from "react";
import type { IGoogleBook, IBook, typeStatus, IUser } from "../../types/types";
import styles from "./BookFormModal.module.css";
import { useSaveBook } from "../../hooks/useSaveBook";
import FormAddNewBook from "../FormAddNewBook/FormAddNewBook";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

interface IBookFormModal {
  handleToggleModal: () => void;
  apiBook?: IGoogleBook;
  userBook?: IBook;
}

const BookFormModal = ({
  handleToggleModal,
  apiBook,
  userBook,
}: IBookFormModal) => {
  const { currentUser } = useAuthContext();
  const { updateUser } = useUpdateUser();

  const book: IBook = userBook
    ? userBook
    : {
        ...apiBook!,
        status: "queroler",
        rating: null,
        review: "",
        favorite: false,
      };

  const [markedAsRead, setMarkedAsRead] = useState<boolean>(false);
  const [status, setStatus] = useState<typeStatus>(
    (book.status as typeStatus) || "queroler"
  );
  const [rating, setRating] = useState<number | null>(book.rating || null);
  const [review, setReview] = useState<string>(book.review || "");
  const { saveBook } = useSaveBook();
  const navigate = useNavigate();

  const handleSaveBook = () => {
    saveBook({ apiBook, userBook, status, rating, review });
    handleToggleModal();
  };

  useEffect(() => {
    if (status === "lido") {
      return setMarkedAsRead(true);
    } else {
      return setMarkedAsRead(false);
    }
  }, [status]);

  const handleDeleteBook = () => {
    if (!currentUser) return;

    const updatedUser: IUser = {
      ...currentUser,
      books: currentUser.books.filter((b) => b.id !== book.id),
    };

    updateUser(updatedUser);
    handleToggleModal();
  };

    const displayBookDetails = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <>
      <section className={styles.background}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2 className="text-3xl italic font-crimson font-bold text-center text-brown">
            {apiBook ? "Adicionar novo livro" : "Editar livro"}
          </h2>

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
                <p className="text-lg font-bold text-brown">
                  {book.volumeInfo.title}{" "}
                </p>
                <p className="text-sm text-lightbrown italic">
                  {book.volumeInfo.authors}
                </p>
              </div>
              <div>
                <label className="mr-2 text-brown font-bold">Status:</label>
                <select
                  defaultValue={status}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="w-32 mt-1 py-2 px-4 rounded-full bg-peach border border-lightbrown"
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
              {userBook && (
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

          <div className="flex items-center gap-5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleModal();
              }}
              className="w-full py-2 border border-brown bg-peach text-brown rounded-2xl font-bold cursor-pointer hover:border-lightbrown hover:text-lightbrown"
            >
              Cancelar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSaveBook();
              }}
              className="w-full py-2 bg-brown text-white border border-brown rounded-2xl font-bold cursor-pointer hover:bg-lightbrown hover:border-lightbrown"
            >
              Salvar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookFormModal;
