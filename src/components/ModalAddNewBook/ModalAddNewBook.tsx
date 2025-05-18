import { useState } from "react";
import type { IFoundBooks } from "../../types/types";
import { FaStar } from "react-icons/fa";
import styles from "./ModalAddNewBook.module.css";

interface IModalAddNewBook {
  handleToggleModal: () => void;
  book: IFoundBooks;
}

const ModalAddNewBook = ({ handleToggleModal, book }: IModalAddNewBook) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const [markedAsRead, setMarkedAsRead] = useState<boolean>(false);

  const getStarColor = (starNumber: number) => {
    if (hoveredStar != null) {
      return starNumber <= hoveredStar ? "text-amber-300" : "text-gray-300";
    }

    if (selectedStar != null) {
      return starNumber <= selectedStar ? "text-amber-300" : "text-gray-300";
    }

    return "text-gray-300";
  };
  return (
    <>
      <section className={styles.background}>
        <div className={styles.modal}>
          <h2 className="text-2xl font-bold text-center text-navy">
            Adicionar novo livro
          </h2>

          <div className="flex justify-center gap-8">
            <div className="shrink-0">
              <img
                className="w-36 h-auto shadow-md"
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt="capa do livro"
              />
            </div>
            <div className="w-full  flex flex-col gap-2">
              <div>
                <p className="text-lg font-semibold">
                  {book.volumeInfo.title}{" "}
                </p>
                <p className="text-sm text-gray-700 italic">
                  {book.volumeInfo.authors}
                </p>
              </div>
              <div>
                <label className="mr-2">Status:</label>
                <select
                  className="border border-gray-300 rounded-md p-2 text-sm"
                  onChange={(e) => {
                    if (e.target.value === "lido") {
                      setMarkedAsRead(true);
                    } else {
                      setMarkedAsRead(false);
                    }
                  }}
                >
                  <option value="queroler">Quero ler</option>
                  <option value="lido">Lido</option>
                </select>
              </div>
              {markedAsRead && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="">Avaliar:</label>{" "}
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer text-4xl transition-colors ${getStarColor(
                            star
                          )}`}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(null)}
                          onClick={() => setSelectedStar(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p>Resenha:</p>
                    <textarea
                      className="w-full h-20 border border-gray-300 rounded-md p-2 text-sm resize-none"
                      rows={3}
                      placeholder="Escreva sua resenha aqui..."
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={handleToggleModal}
              className="w-full py-2 border border-navy text-navy rounded-2xl font-bold cursor-pointer"
            >
              Cancelar
            </button>
            <button className="w-full py-2 bg-navy text-white border border-navy rounded-2xl font-bold cursor-pointer hover:bg-[#3f51b5]">
              Salvar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalAddNewBook;
