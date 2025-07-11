import { FaBook, FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { PiTag } from "react-icons/pi";

interface IBookInfo {
  pageCount?: number;
  publisher?: string;
  publishedDate?: string;
  category?: string;
}

const BookInfo = ({
  pageCount,
  publisher,
  publishedDate,
  category,
}: IBookInfo) => {
  return (
    <div className="w-full flex justify-around gap-4 text-xs md:text-sm text-gray-700">
      {pageCount && (
        <div className="flex flex-col justify-center items-center gap-2">
          <FaBook className="text-sm md:text-xl" />
          <p className="text-gray-600 text-center">{pageCount} páginas</p>
        </div>
      )}
      {publisher && (
        <div className="hidden md:flex flex-col justify-center items-center gap-2">
          <FaRegBuilding className="text-sm md:text-xl" />
          <p className="text-gray-600 text-center">{publisher}</p>
        </div>
      )}
      {publishedDate && (
        <div className="hidden md:flex flex-col justify-center items-center gap-2">
          <BsCalendarDate className="text-sm md:text-xl" />
          <p className="text-gray-600 text-center">
            Publicado em {publishedDate?.slice(0, 4)}
          </p>
        </div>
      )}
      {category && (
        <div className="flex flex-col justify-center items-center gap-2">
          <PiTag className="text-sm md:text-xl" />
          <p className="text-gray-600 text-center">{category}</p>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
