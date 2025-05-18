import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchBookByID } from "../../services/BookAPI";
import type { IFoundBooks } from "../../types/types";
import { FaBook, FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import ModalAddNewBook from "../../components/ModalAddNewBook/ModalAddNewBook";

const BookDetails = () => {
  const { id } = useParams<string>();
  const idBook: string | undefined = id;
  const [book, setBook] = useState<IFoundBooks | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

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
                  <div className="w-36 shrink-0 flex flex-col items-center">
                    <img
                      className=" w-32 h-48 object-cover"
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={`Capa do livro ${book.volumeInfo.title}`}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleModal();
                      }}
                      className="mt-5 flex items-center justify-center gap-1 py-2 w-full bg-navy text-white border-none rounded-2xl cursor-pointer hover:bg-[#3f51b5]"
                    >
                      <LuPlus />
                      Adicionar livro
                    </button>
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
                        __html: book.volumeInfo.description || ""
                      }}
                    />
                  </div>
                  {openModal && (
                    <ModalAddNewBook
                      handleToggleModal={handleToggleModal}
                      book={book}
                    />
                  )}
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
