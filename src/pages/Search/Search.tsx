import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../services/GoogleAPI";
import type { IGoogleBook } from "../../types/types";
import SearchResultItem from "../../components/SearchResultItem/SearchResultItem";
import Loading from "../../components/Loading/Loading";
import Section from "../../components/Section/Section";

const Search = () => {
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
      <Section>
        <div className="w-2xl mx-auto flex flex-col items-center justify-between">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h2 className="font-bold mb-4 text-center">
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
      </Section>
    </>
  );
};

export default Search;
