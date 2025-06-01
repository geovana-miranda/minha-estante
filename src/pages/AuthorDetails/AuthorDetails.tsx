import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import type { IAuthor } from "../../types/types";
import { fetchAuthor } from "../../services/AuthorAPI";
import NotFound from "../../components/NotFound/NotFound";
import semfoto from "../../assets/semfoto.png";
const imgsemfoto = semfoto;

type typeAuthor = IAuthor | { status: number; type: string };

const AuthorDetails = () => {
  const { name } = useParams<string>();
  const [author, setAuthor] = useState<IAuthor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!name) return;

    async function getAuthor(name: string) {
      const data: typeAuthor = await fetchAuthor(name);

      if ("status" in data && data.status === 404) {
        setAuthor(null);
        setLoading(false);
      } else {
        setAuthor(data as IAuthor);
        setLoading(false);
      }
    }

    getAuthor(name);
  }, [name]);

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
          ) : author ? (
            <div className="w-full flex gap-5 mb-5 bg-white rounded-xl shadow-md p-8 mx-auto">
              <div className="w-36 shrink-0 flex flex-col items-center gap-3">
                <img
                  className=" w-32 h-40 object-cover"
                  src={author.thumbnail ? author.thumbnail.source : imgsemfoto}
                  alt={`Foto de ${author.title} `}
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-5">
                <div>
                  <h2 className="text-3xl font-bold text-indigo-900">
                    {author.title}
                  </h2>
                </div>

                <p
                  className="text-sm text-gray-800 leading-relaxed space-y-2 [&_b]:font-semibold [&_i]:italic [&_br]:block"
                  dangerouslySetInnerHTML={{
                    __html: author.extract_html || "",
                  }}
                />
              </div>
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      </section>
    </>
  );
};

export default AuthorDetails;
