import BookFormModal from "../../components/BookModal/BookModal";
import BookActionButton from "../../components/BookActionButton/BookActionButton";
import BookInfo from "../../components/BookInfo/BookInfo";
import { useState } from "react";
import type { IBook, IGoogleBook, typeStatus } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface IBookProps {
  book: IGoogleBook;
  bookStatus: typeStatus | null;
  userBook?: IBook;
}

const Book = ({ book, bookStatus, userBook }: IBookProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

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
    <div className="w-full flex gap-7 mx-auto">
      <div className="w-36 shrink-0 flex flex-col items-center gap-3">
        <img
          className=" w-full h-auto object-cover"
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={`Capa do livro ${book.volumeInfo.title}`}
        />

        <BookActionButton
          bookStatus={bookStatus}
          handleToggleModal={handleToggleModal}
        />
      </div>

      <div className="flex flex-col justify-between items-start gap-8">
        <div>
          <h2 className="text-2xl font-bold ">{book.volumeInfo.title}</h2>
          <p className="italic text-gray-600 mb-2">
            {book.volumeInfo.subtitle}
          </p>
          {book.volumeInfo.authors?.map((author, index) => (
            <span key={index}
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => displayAuthor(author)}
            >
              {author}
            </span>
          ))}
        </div>

        <BookInfo
          pageCount={book.volumeInfo.pageCount}
          publisher={book.volumeInfo.publisher}
          publishedDate={book.volumeInfo.publishedDate}
        />

        <p
          className=" text-sm  leading-relaxed space-y-2 [&_b]:font-semibold [&_i]:italic [&_br]:block"
          dangerouslySetInnerHTML={{
            __html: book.volumeInfo.description || "",
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
