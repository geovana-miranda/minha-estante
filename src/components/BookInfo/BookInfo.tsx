import { FaBook, FaRegBuilding } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

interface IBookInfo {
  pageCount?: number;
  publisher?: string;
  publishedDate?: string;
}

const BookInfo = ({ pageCount, publisher, publishedDate }: IBookInfo) => {
  return (
    <div className="w-full flex justify-around gap-4 text-sm text-gray-700">
      <div className="flex flex-col justify-center items-center gap-2">
        <FaBook className="text-xl " />
        <p className="text-gray-600">{pageCount} páginas</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <FaRegBuilding className="text-xl " />
        <p className="text-gray-600">{publisher}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <BsCalendarDate className="text-xl " />
        <p className="text-gray-600">
          Publicado em {publishedDate?.slice(0, 4)}
        </p>
      </div>
    </div>
  );
};

export default BookInfo;
