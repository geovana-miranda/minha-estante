import type { IGoogleBook, IBook, IUser, typeStatus } from "../../types/types";
import styles from "./BookModal.module.css";
import { useSaveBook } from "../../hooks/useSaveBook";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useAuthContext } from "../../hooks/useAuthContext";
import FormModal from "./FormModal";

interface IBookModalProps {
  handleToggleModal: () => void;
  apiBook?: IGoogleBook;
  userBook?: IBook;
}

const BookModal = ({
  handleToggleModal,
  apiBook,
  userBook,
}: IBookModalProps) => {
  const { currentUser } = useAuthContext();
  const { updateUser } = useUpdateUser();

  const book: IBook = userBook ?? {
    ...apiBook!,
    status: "queroler",
    rating: null,
    review: "",
    favorite: false,
  };

  const isEditMode = !!userBook;

  const { saveBook } = useSaveBook();

  const handleSaveBook = (
    status: typeStatus,
    rating: number | null,
    review: string
  ) => {
    saveBook({ apiBook, userBook, status, rating, review });
    handleToggleModal();
  };

  const handleDeleteBook = () => {
    if (!currentUser) return;

    const updatedUser: IUser = {
      ...currentUser,
      books: currentUser.books.filter((b) => b.id !== book.id),
    };

    updateUser(updatedUser);
    handleToggleModal();
  };

  return (
    <>
      <section className={styles.background}>
        <dialog className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2 className="text-3xl  font-bold text-center">
            {isEditMode ? "Editar livro" : "Adicionar novo livro"}
          </h2>

          <FormModal
            book={book}
            handleDeleteBook={handleDeleteBook}
            isEditMode={isEditMode}
            handleToggleModal={handleToggleModal}
            handleSaveBook={handleSaveBook}
          />
        </dialog>
      </section>
    </>
  );
};

export default BookModal;
