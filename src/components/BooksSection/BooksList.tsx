import CardBook from "../CardBook/CardBook";
import type { IBook } from "../../types/types";

const BooksList = ({ filteredBooks }: { filteredBooks: IBook[] }) => {
  return (
    <ul className="md:-mx-2 lg:mx-0 px-3 md:px-0 flex items-center justify-start gap-2 lg:gap-4 flex-wrap">
      {filteredBooks.map((book) => (
        <li key={book.id}>
          <CardBook book={book} />
        </li>
      ))}
    </ul>
  );
};

export default BooksList;
