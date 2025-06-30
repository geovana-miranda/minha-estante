import { FaBook, FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { PiTag } from "react-icons/pi";

interface IBookInfo {
  pageCount?: number;
  publisher?: string;
  publishedDate?: string;
  category: string;
}

const BookInfo = ({
  pageCount,
  publisher,
  publishedDate,
  category,
}: IBookInfo) => {
  return (
    <div className="w-full flex justify-around gap-4 text-sm text-gray-700">
      <div className="flex flex-col justify-center items-center gap-2">
        <FaBook className="text-xl" />
        <p className="text-gray-600">{pageCount} páginas</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <FaRegBuilding className="text-xl" />
        <p className="text-gray-600">{publisher}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <BsCalendarDate className="text-xl" />
        <p className="text-gray-600">
          Publicado em {publishedDate?.slice(0, 4)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <PiTag className="text-xl" />
        {category && <p className="text-gray-600">{category}</p>}
      </div>
    </div>
  );
};

export default BookInfo;
