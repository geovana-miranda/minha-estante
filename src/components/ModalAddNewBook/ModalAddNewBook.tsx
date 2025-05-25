import { useContext, useEffect, useState } from "react";
import type { IGoogleBook, IUser, IBook } from "../../types/types";
import { FaStar } from "react-icons/fa";
import styles from "./ModalAddNewBook.module.css";
import { AuthContext } from "../../context/AuthContext";
import { UsersContext } from "../../context/UsersContext";

interface IModalAddNewBook {
  handleToggleModal: () => void;
  apiBook?: IGoogleBook;
  userBook?: IBook;
}

type typeStatus = "queroler" | "lido";

const ModalAddNewBook = ({
  handleToggleModal,
  apiBook,
  userBook,
}: IModalAddNewBook) => {
  const usersContext = useContext(UsersContext);
  const authContext = useContext(AuthContext);

  if (!usersContext || !authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser, setCurrentUser } = authContext;
  const { users, setUsers } = usersContext;

  const book: IBook = userBook
    ? userBook
    : { ...apiBook!, status: "queroler", rating: null, review: "", favorite: false };

  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(
    book.rating || null
  );

  const [markedAsRead, setMarkedAsRead] = useState<boolean>(false);

  const [status, setStatus] = useState<typeStatus>(
    (book.status as typeStatus) || "queroler"
  );
  const [rating, setRating] = useState<number | null>(book.rating || null);
  const [review, setReview] = useState<string>(book.review || "");

  const getStarColor = (starNumber: number) => {
    if (hoveredStar != null) {
      return starNumber <= hoveredStar ? "text-amber-300" : "text-gray-300";
    }

    if (selectedStar != null) {
      return starNumber <= selectedStar ? "text-amber-300" : "text-gray-300";
    }

    return "text-gray-300";
  };

  const saveBook = () => {
    let bookDetails = {
      id: book.id,
      volumeInfo: {
        title: book.volumeInfo.title,
        subtitle: book.volumeInfo.subtitle,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        publisher: book.volumeInfo.publisher,
        pageCount: book.volumeInfo.pageCount,
        publishedDate: book.volumeInfo.publishedDate,
        imageLinks: {
          thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        },
      },
      status,
      rating,
      review,
      favorite: false,
    };

    if (!currentUser) return;

    if (apiBook) {
      const updatedUser: IUser = {
        ...currentUser,
        books: [...(currentUser.books || []), bookDetails],
      };

      setCurrentUser(updatedUser);

      setUsers([
        ...users.map((user) =>
          user.id === currentUser.id ? updatedUser : user
        ),
      ]);
    }

    if (userBook) {
      if (bookDetails.status === "queroler") {
        bookDetails = { ...bookDetails, rating: null, review: "" };
      }

      const updatedUser: IUser = {
        ...currentUser,
        books: [
          ...currentUser.books.map((b) => (b.id === book.id ? bookDetails : b)),
        ],
      };

      setCurrentUser(updatedUser);
      setUsers([
        ...users.map((user) =>
          user.id === currentUser.id ? updatedUser : user
        ),
      ]);
    }

    handleToggleModal();
  };

  useEffect(() => {
    if (status === "lido") {
      return setMarkedAsRead(true);
    }

    if (status === "queroler") {
      return setMarkedAsRead(false);
    }
  }, [status]);

  return (
    <>
      <section className={styles.background}>
        <div className={styles.modal}>
          <h2 className="text-2xl font-bold text-center text-navy">
            Adicionar novo livro
          </h2>

          <div className="flex justify-center gap-8">
            <div className="shrink-0">
              <img
                className="w-36 h-auto shadow-md"
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt="capa do livro"
              />
            </div>
            <div className="w-full  flex flex-col gap-2">
              <div>
                <p className="text-lg font-semibold">
                  {book.volumeInfo.title}{" "}
                </p>
                <p className="text-sm text-gray-700 italic">
                  {book.volumeInfo.authors}
                </p>
              </div>
              <div>
                <label className="mr-2">Status:</label>
                <select
                  defaultValue={status}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="border border-gray-300 rounded-md p-2 text-sm"
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
                <>
                  <div className="flex items-center gap-2">
                    <label className="">Avaliar:</label>{" "}
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer text-4xl transition-colors ${getStarColor(
                            star
                          )}`}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStar(star);
                            setRating(star);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p>Resenha:</p>
                    <textarea
                      className="w-full h-20 border border-gray-300 rounded-md p-2 text-sm resize-none"
                      maxLength={240}
                      value={review}
                      placeholder="Escreva sua resenha aqui..."
                      onChange={(e) => setReview(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleModal();
              }}
              className="w-full py-2 border border-navy text-navy rounded-2xl font-bold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                saveBook();
              }}
              className="w-full py-2 bg-navy text-white border border-navy rounded-2xl font-bold cursor-pointer hover:bg-[#3f51b5]"
            >
              Salvar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalAddNewBook;
