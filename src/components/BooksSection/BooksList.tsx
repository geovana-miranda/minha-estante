import CardBook from "../CardBook/CardBook";
import type { IBook } from "../../types/types";

const BooksList = ({ filteredBooks }: { filteredBooks: IBook[] }) => {
  return (
    <ul className="px-2 flex items-center justify-start gap-2 md:gap-4 flex-wrap">
      {filteredBooks.map((book) => (
        <li key={book.id}>
          <CardBook book={book} />
        </li>
      ))}
    </ul>
  );
};

export default BooksList;
