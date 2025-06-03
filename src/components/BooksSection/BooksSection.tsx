import { useEffect, useState } from "react";
import CardBook from "../CardBook/CardBook";
import type { IBook } from "../../types/types";
import { useAuth } from "../../hooks/useAuth";

const BooksSection = () => {
  const { currentUser } = useAuth();


  type typeDisplayBooks = "queroler" | "lido" | "favoritos";

  const [displayBooks, setDisplayBooks] = useState<typeDisplayBooks>("lido");
  const [filteredBooks, setFilteredBooks] = useState<IBook[] | null>(null);

  useEffect(() => {
    console.log("aqui");
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
    <section className="w-4xl h-auto mx-auto mt-5 mb-10">
      <div className="px-3">
        <div className="flex items-center gap-5 my-6 mx-auto">
          <span className="text-2xl font-bold font-cormorant text-brown">
            Exibir:{" "}
          </span>
          <select
            className="w-32 mt-1 py-2 px-4 rounded-full bg-peach border border-brown"
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
          <ul className="flex items-center justify-start gap-4 flex-wrap">
            {filteredBooks && filteredBooks.length > 0 ? (
              filteredBooks.map((b) => (
                <li key={b.id}>
                  <CardBook book={b} />
                </li>
              ))
            ) : (
              <div className="mx-auto text-brown text-lg font-semibold">
                {displayBooks === "queroler" ? (
                  <p>
                    Você ainda não adicionou nenhum livro à sua lista de "quero
                    ler".
                  </p>
                ) : displayBooks === "lido" ? (
                  <p>Você ainda não adicionou nenhum livro à sua lista de "lidos".</p>
                ) : (
                  <p>
                    Você ainda não adicionou nenhum livro à sua lista de "favoritos".
                  </p>
                )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
