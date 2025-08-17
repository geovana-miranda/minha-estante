import BookFormModal from "../../components/BookModal/BookModal";
import BookActionButton from "../../components/BookActionButton/BookActionButton";
import BookInfo from "../../components/BookInfo/BookInfo";
import { useState } from "react";
import type { IBook, IGoogleBook, typeStatus } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { translateCategories } from "../../utils/categories";

interface IBookProps {
  book: IGoogleBook;
  userBook?: IBook;
}

const Book = ({ book, userBook }: IBookProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();
  let category: string = "";

  if (book.volumeInfo.categories) {
    const categories = book.volumeInfo.categories[0].split("/").slice(1, 2);
    category = translateCategories(categories[0].trim()).toString();
  }

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const displayAuthor = (author: string) => {
    if (author) {
      const normalizedName = author.replace(/ /g, "_");
      navigate(`/author/${normalizedName}`);
    }
  };

  return (
    <div className="w-full flex gap-2 md:gap-7 mx-auto">
      <div className="w-16 md:w-36 shrink-0 flex flex-col items-center gap-3">
        <img
          className="w-36 h-auto object-cover"
          src={book.volumeInfo.imageLinks?.thumbnail || "/semcapa.jpg"}
          alt={`Capa do livro ${book.volumeInfo.title}`}
        />

        <BookActionButton
          bookStatus={userBook ? (userBook.status as typeStatus) : null}
          handleToggleModal={handleToggleModal}
        />
      </div>

      <div className="flex w-60 md:w-full flex-col justify-between items-start gap-8">
        <div>
          <h2 className="md:text-2xl font-bold ">{book.volumeInfo.title}</h2>
          <p className="text-xs md:text-base italic mb-2 text-gray-600">
            {book.volumeInfo.subtitle}
          </p>

          {book.volumeInfo.authors?.map((author, index) => (
            <div
              key={index}
              className="text-xs md:text-base text-blue-600 cursor-pointer hover:underline"
              onClick={() => displayAuthor(author)}
            >
              {author}
            </div>
          ))}
        </div>

        <BookInfo
          pageCount={book.volumeInfo.pageCount}
          publisher={book.volumeInfo.publisher}
          publishedDate={book.volumeInfo.publishedDate}
          category={category}
        />

        <p
          className="text-xs md:text-sm leading-relaxed space-y-2 [&_b]:font-semibold [&_i]:italic [&_br]:block"
          dangerouslySetInnerHTML={{
            __html:
              book.volumeInfo.description ||
              "Esse volume não possui uma descrição.",
          }}
        />
      </div>

      {openModal && (
        <BookFormModal
          handleToggleModal={handleToggleModal}
          userBook={userBook ? userBook : undefined}
          apiBook={!userBook ? book : undefined}
        />
      )}
    </div>
  );
};

export default Book;
