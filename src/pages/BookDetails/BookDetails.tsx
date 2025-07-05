import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchBookByID } from "../../services/GoogleAPI";
import type { IBook, IGoogleBook, typeStatus } from "../../types/types";
import Loading from "../../components/Loading/Loading";
import { useAuthContext } from "../../hooks/useAuthContext";
import NotFound from "../../components/NotFound/NotFound";
import Section from "../../components/Section/Section";
import Book from "../../components/Book/Book";

const BookDetails = () => {
  const { currentUser } = useAuthContext();

  const { id } = useParams<string>();
  const idBook: string | undefined = id;
  const [book, setBook] = useState<IGoogleBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookStatus, setBookStatus] = useState<typeStatus | null>(null);
  const userBook = currentUser?.books.find((b) => b.id === book?.id) as IBook;

  useEffect(() => {
    if (userBook) {
      setBookStatus(userBook.status as typeStatus);
    }
  }, [currentUser, userBook]);

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

  return (
    <>
      <Header />
      <Section>
        <div className="w-76 md:w-xl lg:w-3xl py-6 mx-auto flex flex-col items-center justify-between">
          {loading && !book ? (
            <Loading />
          ) : (
            <>
              {book ? (
                <Book book={book} bookStatus={bookStatus} userBook={userBook} />
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
