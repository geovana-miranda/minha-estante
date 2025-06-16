import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../services/GoogleAPI";
import type { IGoogleBook  } from "../../types/types";
import SearchResultItem from "../../components/SearchResultItem/SearchResultItem";
import Loading from "../../components/Loading/Loading";

const Search = () => {
  console.log("renderizando")

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [foundBooks, setFoundBooks] = useState<IGoogleBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getBooks() {
      if (!query) return;

      const data = await fetchBooks(query);
      setFoundBooks(data);
      setLoading(false);
    }

    getBooks();
  }, [query]);

  return (
    <>
      <Header />
      <section className="w-4xl h-auto mx-auto py-10 rounded-2xl shadow-xl border border-lightbrown">
        <div className="w-2xl mx-auto flex flex-col items-center justify-between">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h2 className="text-3xl font-bold font-cormorant text-brown mb-4 text-center">
                Exibindo resultados da pesquisa por: {query}{" "}
              </h2>
              <div className="w-full">
                <ul>
                  {foundBooks.map((book) => (
                    <li key={book.id}>
                      <SearchResultItem apiBook={book} />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
