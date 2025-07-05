import { useEffect, useState } from "react";
import type { IBook, typeDisplayBooks } from "../../types/types";
import { useAuthContext } from "../../hooks/useAuthContext";
import Section from "../Section/Section";
import BooksList from "./BooksList";
import FilterBooksSelect from "./FilterBooksSelect";

const BooksSection = () => {
  const { currentUser } = useAuthContext();

  const [displayBooks, setDisplayBooks] = useState<typeDisplayBooks>("lido");
  const [filteredBooks, setFilteredBooks] = useState<IBook[] | null>(null);

  const messages = {
    queroler:
      'Você ainda não adicionou nenhum livro à sua lista de "quero ler".',
    lido: 'Você ainda não adicionou nenhum livro à sua lista de "lidos".',
    favoritos:
      'Você ainda não adicionou nenhum livro à sua lista de "favoritos".',
  };

  useEffect(() => {
    if (!currentUser?.books) return;

    const books: IBook[] = currentUser?.books;

    let filtered: IBook[] = [];

    if (displayBooks === "favoritos") {
      filtered = books.filter((b: IBook) => b.favorite);
    } else {
      filtered = books.filter((b: IBook) => b.status === displayBooks);
    }

    setFilteredBooks(filtered);
  }, [displayBooks, currentUser]);

  return (
    <Section>
      <div>
        <FilterBooksSelect setDisplayBooks={setDisplayBooks}/>
        <div>
          <div>
            {filteredBooks && filteredBooks.length > 0 ? (
              <BooksList filteredBooks={filteredBooks} />
            ) : (
              <div className="mx-auto">
                <p className="text-center">{messages[displayBooks]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BooksSection;
