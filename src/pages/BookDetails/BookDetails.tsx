import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { fetchBookByID } from "../../services/BookAPI";
import type { IBook, IGoogleBook, typeStatus } from "../../types/types";
import { FaBook, FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import ModalAddNewBook from "../../components/ModalAddNewBook/ModalAddNewBook";
import { AuthContext } from "../../context/AuthContext";
import { HiCheck } from "react-icons/hi";
import BooksSection from "../../components/BooksSection/BooksSection";

const BookDetails = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser } = authContext;
  const { id } = useParams<string>();
  const idBook: string | undefined = id;
  const [book, setBook] = useState<IGoogleBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [bookStatus, setBookStatus] = useState<typeStatus | null>(null);
  const userBook = currentUser?.books.find((b) => b.id === book?.id) as IBook;

  const getStatusColor = (bookStatus: typeStatus) => {
    if (bookStatus === "lido") {
      return `bg-green-700`;
    } else {
      return `bg-yellow-400`;
    }
  };

  useEffect(() => {
    const updatedStatus = currentUser?.books.find(
      (b) => b.id === book?.id
    ) as IBook;

    if (updatedStatus) {
      setBookStatus(updatedStatus.status as typeStatus);
    } else {
      setBookStatus(null)
    }
  }, [currentUser, book]);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (!idBook) return;

    async function getBookByID(id: string) {
      const data = await fetchBookByID(id);
      setBook(data);
      setLoading(false);
    }

    getBookByID(idBook);
  }, [id]);

  return (
    <>
      <Header />
      <section className="w-4xl h-auto mx-auto bg-amber-50 py-10 rounded-2xl shadow-xl border border-gray-200">
        <div className="w-2xl mx-auto flex flex-col items-center justify-between">
          {loading && !book ? (
            <div className="mx-auto flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="text-xl italic text-navy mb-6 text-center">
                Carregando...
              </span>
            </div>
          ) : (
            <>
              {book && (
                <div className="w-full flex gap-5 mb-5 bg-white rounded-xl shadow-md p-8 mx-auto">
                  <div className="w-36 shrink-0 flex flex-col items-center gap-3">
                    <img
                      className=" w-32 h-48 object-cover"
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={`Capa do livro ${book.volumeInfo.title}`}
                    />

                    {bookStatus ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleModal();
                        }}
                        className={`flex items-center gap-1 border-none cursor-pointer px-4 py-1 rounded-full text-sm text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition" ${getStatusColor(
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
                        className="flex items-center gap-1 px-6 py-1 bg-navy text-white border-none cursor-pointer  rounded-full text-sm shadow hover:shadow-lg hover:-translate-y-0.5 transition"
                      >
                        <LuPlus />
                        Adicionar livro
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col justify-between items-start gap-5">
                    <div>
                      <h2 className="text-3xl font-bold text-indigo-900">
                        {book.volumeInfo.title}
                      </h2>
                      <p className="italic text-indigo-600">
                        {book.volumeInfo.subtitle}
                      </p>
                      <p className="text-gray-600">{book.volumeInfo.authors}</p>
                    </div>

                    <div className="w-full flex justify-around gap-4 text-sm text-gray-700">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <FaBook className="text-xl text-navy" />
                        <p className="text-indigo-600">
                          {book.volumeInfo.pageCount} páginas
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <FaRegBuilding className="text-xl text-navy" />
                        <p className="text-indigo-600">
                          {book.volumeInfo.publisher}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <BsCalendarDate className="text-xl text-navy" />
                        <p className="text-indigo-600">
                          Publicado em{" "}
                          {book.volumeInfo.publishedDate?.slice(0, 4)}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-sm text-gray-800 leading-relaxed space-y-2 [&_b]:font-semibold [&_i]:italic [&_br]:block"
                      dangerouslySetInnerHTML={{
                        __html: book.volumeInfo.description || "",
                      }}
                    />
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
                        apiBook={book}
                      />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default BookDetails;
