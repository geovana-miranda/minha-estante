import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardBook from "../CardBook/CardBook";
import type { IBook } from "../../types/types";

const BooksSection = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser } = authContext;

  type typeDisplayBooks = "queroler" | "lido" | "favoritos";

  const [displayBooks, setDisplayBooks] = useState<typeDisplayBooks>("lido");
  const [filteredBooks, setFilteredBooks] = useState<IBook[] | null>(null);

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
    <section className="w-4xl h-auto mx-auto mt-5 mb-10">
      <div className="px-3">
        <div className="flex items-center gap-5 my-6 mx-auto">
          <span className="text-2xl font-bold font-cormorant text-brown">Exibir: </span>
          <select
            className="w-30 mt-1 py-2 px-6 rounded-full bg-peach border border-brown"
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
              <div className="mx-auto text-gray-800">
                {displayBooks === "queroler" ? (
                  <p>
                    Você ainda não adicionou nenhum livro a lista de "quero
                    ler".
                  </p>
                ) : (
                  <p>Você ainda não adicionou nenhum livro lista de "lidos".</p>
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
