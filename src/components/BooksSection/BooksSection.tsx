import { useEffect, useState } from "react";
import type { IBook } from "../../types/types";
import { useAuthContext } from "../../hooks/useAuthContext";
import Section from "../Section/Section";
import BooksList from "./BooksList";

const BooksSection = () => {
  const { currentUser } = useAuthContext();

  type typeDisplayBooks = "queroler" | "lido" | "favoritos";

  const [displayBooks, setDisplayBooks] = useState<typeDisplayBooks>("lido");
  const [filteredBooks, setFilteredBooks] = useState<IBook[] | null>(null);

  const messages = {
  queroler: 'Você ainda não adicionou nenhum livro à sua lista de "quero ler".',
  lido: 'Você ainda não adicionou nenhum livro à sua lista de "lidos".',
  favoritos: 'Você ainda não adicionou nenhum livro à sua lista de "favoritos".',
};

  useEffect(() => {
    if (displayBooks === "lido" || displayBooks === "queroler") {
      setFilteredBooks(
        currentUser?.books
          ? currentUser.books.filter((b) =>
              b.status === displayBooks ? b : ""
            )
          : null
      );
    }

    if (displayBooks === "favoritos") {
      setFilteredBooks(
        currentUser?.books ? currentUser.books.filter((b) => b.favorite) : null
      );
    }
  }, [displayBooks, currentUser]);

  return (
    <Section>
      <div className="px-3">
        <div className="flex items-center gap-5 my-6 mx-auto">
          <span className="text-lg font-bold">Exibir: </span>
          <select
            className="w-32 py-1 px-3 rounded-full  border border-gray-300"
            onChange={(e) => {
              setDisplayBooks(e.target.value as typeDisplayBooks);
            }}
          >
            <option value="lido">Lidos</option>
            <option value="queroler">Quero ler</option>
            <option value="favoritos">Favoritos</option>
          </select>
        </div>
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
