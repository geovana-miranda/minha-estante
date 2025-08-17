import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../services/GoogleAPI";
import type { IGoogleBook } from "../../types/types";
import SearchResultItem from "../../components/SearchResultItem/SearchResultItem";
import Loading from "../../components/Loading/Loading";
import Section from "../../components/Section/Section";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  let page = Number(searchParams.get("page"));

  const navigate = useNavigate();

  const [foundBooks, setFoundBooks] = useState<IGoogleBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstIndex, setFirstIndex] = useState<number>(0);

  useEffect(() => {
    setFirstIndex(page * 10 - 10);
  }, [query, page]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    setLoading(true);

    async function getBooks() {
      if (!query) return;
      const data = await fetchBooks(query, firstIndex);
      setFoundBooks(data);
      setLoading(false);
    }

    getBooks();
  }, [query, firstIndex]);

  const nextPage = () => {
    navigate(`/search?query=${query}&page=${page + 1}`);
  };

  const previousPage = () => {
    if (firstIndex <= 0) return;
    navigate(`/search?query=${query}&page=${page - 1}`);
  };

  return (
    <>
      <Header />
      <Section>
        <div className="w-76 md:w-xl lg:w-2xl mx-auto flex flex-col items-center justify-between">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h2 className="text-sm md:text-lg font-bold mb-4 text-center">
                Exibindo resultados da pesquisa por: {query}{" "}
              </h2>

              {foundBooks.length > 0 ? (
                <div className="w-full">
                  <ul>
                    {foundBooks.map((book) => (
                      <li key={book.id}>
                        <SearchResultItem apiBook={book} />
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center gap-4">
                    <button
                      className={`flex items-center gap-2 py-1 px-4 border text-xs md:text-base rounded-3xl ${
                        firstIndex === 0
                          ? "cursor-auto bg-gray-200 border-gray-400 text-gray-400"
                          : "border-gray-600 cursor-pointer text-gray-700 hover:bg-gray-300 hover:text-gray-700 transition-colors"
                      }`}
                      onClick={previousPage}
                    >
                      <GrFormPreviousLink className="text-xl" />
                      Anterior
                    </button>
                    <button
                      className="flex items-center gap-2 py-1 px-4 border border-gray-600 text-xs md:text-base text-gray-700 rounded-3xl cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition-colors"
                      onClick={nextPage}
                    >
                      Próximo
                      <GrFormNextLink className="text-xl" />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs md:text-sm text-center">
                  Desculpe. Nós não encontramos o livro que você está
                  procurando.
                </p>
              )}
            </>
          )}
        </div>
      </Section>
    </>
  );
};

export default Search;
