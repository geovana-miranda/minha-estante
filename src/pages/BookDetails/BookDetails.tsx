import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { fetchBookByID } from "../../services/GoogleAPI";
import type { IBook, IGoogleBook, typeStatus } from "../../types/types";
import { FaBook, FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import BookFormModal from "../../components/BookFormModal/BookFormModal";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthContext";
import BookActionButton from "../../components/BookActionButton/BookActionButton";

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
  const navigate = useNavigate();

  useEffect(() => {
    const updatedStatus = currentUser?.books.find(
      (b) => b.id === book?.id
    ) as IBook;

    if (updatedStatus) {
      setBookStatus(updatedStatus.status as typeStatus);
    } else {
      setBookStatus(null);
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

  const displayAuthor = () => {
    const name = book?.volumeInfo.authors;

    if (name) {
      const normalizedName = name[0].replace(/ /g, "_");
      navigate(`/author/${normalizedName}`);
    }
  };

  return (
    <>
      <Header />
      <section className="w-4xl h-auto mx-auto py-10 rounded-2xl shadow-xl border border-lightbrown">
        <div className="w-3xl mx-auto flex flex-col items-center justify-between">
          {loading && !book ? (
            <Loading />
          ) : (
            <>
              {book && (
                <div className="w-full flex gap-5 mb-5 bg-peach rounded-xl shadow-md p-8 mx-auto border border-lightbrown">
                  <div className="w-36 shrink-0 flex flex-col items-center gap-3">
                    <img
                      className=" w-36 h-52 object-cover"
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={`Capa do livro ${book.volumeInfo.title}`}
                    />

                    <BookActionButton
                      bookStatus={bookStatus}
                      handleToggleModal={handleToggleModal}
                    />
                  </div>
                  <div className="flex flex-col justify-between items-start gap-5">
                    <div>
                      <h2 className="text-4xl font-bold text-brown font-cormorant">
                        {book.volumeInfo.title}
                      </h2>
                      <p className="text-xl font-cormorant italic text-lightbrown mb-2">
                        {book.volumeInfo.subtitle}
                      </p>
                      <p
                        className="text-gray-600 cursor-pointer"
                        onClick={displayAuthor}
                      >
                        {book.volumeInfo.authors}
                      </p>
                    </div>

                    <div className="w-full flex justify-around gap-4 text-sm text-gray-700">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <FaBook className="text-xl text-brown" />
                        <p className="text-lightbrown">
                          {book.volumeInfo.pageCount} páginas
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <FaRegBuilding className="text-xl text-brown" />
                        <p className="text-lightbrown">
                          {book.volumeInfo.publisher}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <BsCalendarDate className="text-xl text-brown" />
                        <p className="text-lightbrown">
                          Publicado em{" "}
                          {book.volumeInfo.publishedDate?.slice(0, 4)}
                        </p>
                      </div>
                    </div>

                    <p
                      className="text-brown leading-relaxed space-y-2 [&_b]:font-semibold [&_i]:italic [&_br]:block"
                      dangerouslySetInnerHTML={{
                        __html: book.volumeInfo.description || "",
                      }}
                    />
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
