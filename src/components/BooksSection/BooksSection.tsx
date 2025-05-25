import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardBook from "../CardBook/CardBook";

const BooksSection = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser } = authContext;

  type typeStatus = "queroler" | "lido";

  const [displayBooks, setDisplayBooks] = useState<typeStatus>("lido");
  const filteredBooks = currentUser?.books
    ? currentUser.books.filter((b) => (b.status === displayBooks ? b : ""))
    : null;

  return (
    <section className="w-4xl h-auto mx-auto bg-amber-50 py-10 rounded-2xl shadow-xl border border-gray-200 my-10 ">
      <div className="w-3xl mx-auto">
        <div className="flex items-center gap-5 mb-5">
          <span>Exibir: </span>
          <select
            className="w-30 mt-1 p-2 rounded-2xl bg-white border border-blue-200"
            onChange={(e) => {
              if (e.target.value === "lido") {
                setDisplayBooks("lido");
              } else {
                setDisplayBooks("queroler");
              }
            }}
          >
            <option value="lido">Lidos</option>
            <option value="queroler">Quero ler</option>
          </select>
        </div>
        <div>
          <ul className="flex items-center justify-start gap-2 flex-wrap">
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
