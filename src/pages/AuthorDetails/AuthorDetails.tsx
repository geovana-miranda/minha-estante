import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import type { IAuthor, IGoogleBook } from "../../types/types";
import { fetchAuthor } from "../../services/WikipediaAPI";
import NotFound from "../../components/NotFound/NotFound";
import semfoto from "../../assets/semfoto.png";
import { fetchBooksByAuthor } from "../../services/GoogleAPI";
import Loading from "../../components/Loading/Loading";
import Section from "../../components/Section/Section";
const imgsemfoto = semfoto;

type typeAuthor = IAuthor | { status: number; type: string };

const AuthorDetails = () => {
  const { name } = useParams<string>();
  const [author, setAuthor] = useState<IAuthor | null>(null);
  const [booksByAuthor, setBooksByAuthor] = useState<IGoogleBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) return;

    async function getAuthor(name: string) {
      try {
        const data: typeAuthor = await fetchAuthor(name);

        if ("status" in data && data.status === 404) {
          setAuthor(null);
        } else {
          setAuthor(data as IAuthor);
        }
      } catch (error) {
        console.error("Erro ao buscar autor:", error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    }

    getAuthor(name);
  }, [name]);

  useEffect(() => {
    if (!author) return;

    const normalizedName = name?.replace(/_/g, "%20");

    async function getBooksByAuthor(normalizedName: string) {
      try {
        const data = await fetchBooksByAuthor(normalizedName);
        setBooksByAuthor(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    if (normalizedName) getBooksByAuthor(normalizedName);
  }, [author]);

  const displayBookDetails = (id: string) => {
    navigate(`/book/${id}`);
  };

  return (
    <>
      <Header />
      <Section>
        <div className="w-3xl py-6 mx-auto flex flex-col items-center justify-between">
          {loading ? (
            <Loading />
          ) : author ? (
            <div className="w-full flex gap-7 mx-auto">
              <div className="w-36 shrink-0 flex flex-col items-center gap-3">
                <img
                  className="w-full h-auto object-cover"
                  src={author.thumbnail ? author.thumbnail.source : imgsemfoto}
                  alt={`Foto de ${author.title} `}
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-5">
                <div>
                  <h2 className="text-2xl font-bold ">
                    {author.title}
                  </h2>
                </div>

                <p
                  className=" text-sm leading-relaxed space-y-2 [&_b]:font-semibold [&_i]:italic [&_br]:block"
                  dangerouslySetInnerHTML={{
                    __html: author.extract_html || "",
                  }}
                />

                {booksByAuthor && (
                  <>
                    <h2 className=" text-lg font-bold">
                      Livros publicados por {author.title}:
                    </h2>
                    <ul className="flex items-center justify-start gap-3 flex-wrap">
                      {booksByAuthor.map((book) => (
                        <li key={book.id}>
                          <div
                            className="relative w-24 h-32 flex flex-col items-center justify-center bg-white border-gray-300 border rounded-xl shadow-lg cursor-pointer"
                            onClick={() => displayBookDetails(book.id)}
                          >
                            <div className="w-20 h-28 shrink-0">
                              <img
                                className="w-20 h-28 object-cover"
                                src={book.volumeInfo.imageLinks?.thumbnail}
                                alt={`Capa do livro ${book.volumeInfo.title}`}
                              />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      </Section>
    </>
  );
};

export default AuthorDetails;
