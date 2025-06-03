import { LuPlus } from "react-icons/lu";
import { HiCheck } from "react-icons/hi";
import type { typeStatus } from "../../types/types";

interface IBookActionButtonProps {
  bookStatus?: typeStatus | null;
  handleToggleModal: any;
}

const BookActionButton = ({
  bookStatus,
  handleToggleModal,
}: IBookActionButtonProps) => {
  const getStatusColor = (bookStatus: typeStatus) => {
    if (bookStatus === "lido") {
      return `bg-[#225f2c]`;
    } else {
      return `bg-yellow-500`;
    }
  };

  return bookStatus ? (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleModal();
      }}
      className={`font-semibold flex items-center justify-center gap-1 border-none cursor-pointer w-full py-2 rounded-full text-sm text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition" ${getStatusColor(
        bookStatus
      )}`}
    >
      <HiCheck className="text-lg" />
      {bookStatus === "lido" ? "Lido" : "Quero ler"}
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleModal();
      }}
      className="font-semibold flex items-center justify-center gap-1 w-full py-2 bg-indigo-900 text-white border-none cursor-pointer  rounded-full text-sm shadow hover:shadow-lg hover:-translate-y-0.5 transition"
    >
      <LuPlus className="text-lg" />
      Adicionar livro
    </button>
  );
};

export default BookActionButton;
