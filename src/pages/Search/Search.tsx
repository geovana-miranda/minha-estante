import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../services/BookAPI";
import type { IFoundBooks } from "../../types/types";
import SearchResultItem from "../../components/SearchResultItem/SearchResultItem";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [foundBooks, setFoundBooks] = useState<IFoundBooks[]>([]);
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
      <section className="w-4xl h-auto mx-auto bg-amber-50 py-10 rounded-2xl shadow-xl border border-gray-200">
        <div className="w-2xl mx-auto flex flex-col items-center justify-between">
          {loading ? (
            <div className="mx-auto flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="text-xl italic text-navy mb-6 text-center">
                Carregando...
              </span>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-navy mb-4 text-center">
                Exibindo resultados da pesquisa por: {query}{" "}
              </h2>
              <div className="w-full">
                <ul>
                  {foundBooks.map((book) => (
                    <li key={book.id}>
                      <SearchResultItem book={book} />
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
