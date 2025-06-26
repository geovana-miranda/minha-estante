import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchBookByID } from "../../services/GoogleAPI";
import type { IBook, IGoogleBook, typeStatus } from "../../types/types";
import BookFormModal from "../../components/BookFormModal/BookFormModal";
import Loading from "../../components/Loading/Loading";
import BookActionButton from "../../components/BookActionButton/BookActionButton";
import { useAuthContext } from "../../hooks/useAuthContext";
import NotFound from "../../components/NotFound/NotFound";
import Section from "../../components/Section/Section";
import BookInfo from "../../components/BookInfo/BookInfo";

const BookDetails = () => {
  const { currentUser } = useAuthContext();

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
      try {
        const data = await fetchBookByID(id);
        setBook(data);
      } catch (error) {
        console.error("Erro ao buscar livro:", error);
      } finally {
        setLoading(false);
      }
    }

    getBookByID(idBook);
  }, [id]);

  const displayAuthor = (author: string) => {
    if (author) {
      const normalizedName = author.replace(/ /g, "_");
      navigate(`/author/${normalizedName}`);
    }
  };

  return (
    <>
      <Header />
      <Section>
        <div className="w-3xl py-6 mx-auto flex flex-col items-center justify-between">
          {loading && !book ? (
            <Loading />
          ) : (
            <>
              {book ? (
                <div className="w-full flex gap-7 mx-auto">
                  <div className="w-36 shrink-0 flex flex-col items-center gap-3">
                    <img
                      className=" w-full h-auto object-cover"
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt={`Capa do livro ${book.volumeInfo.title}`}
                    />

                    <BookActionButton
                      bookStatus={bookStatus}
                      handleToggleModal={handleToggleModal}
                    />
                  </div>

                  <div className="flex flex-col justify-between items-start gap-8">
                    <div>
                      <h2 className="text-2xl  font-bold ">
                        {book.volumeInfo.title}
                      </h2>
                      <p className="italic text-gray-600 mb-2">
                        {book.volumeInfo.subtitle}
                      </p>
                      {book.volumeInfo.authors?.map((author) => (
                        <span
                          className="text-blue-600 cursor-pointer hover:underline"
                          onClick={() => displayAuthor(author)}
                        >
                          {author}
                        </span>
                      ))}
                    </div>

                    <BookInfo
                      pageCount={book.volumeInfo.pageCount}
                      publisher={book.volumeInfo.publisher}
                      publishedDate={book.volumeInfo.publishedDate}
                    />

                    <p
                      className=" text-sm  leading-relaxed space-y-2 [&_b]:font-semibold [&_i]:italic [&_br]:block"
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
              ) : (
                <NotFound />
              )}
            </>
          )}
        </div>
      </Section>
    </>
  );
};

export default BookDetails;
