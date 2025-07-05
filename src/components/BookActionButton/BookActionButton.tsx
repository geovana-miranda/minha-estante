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
      return `bg-green-700`;
    } else {
      return `bg-yellow-500`;
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleModal();
      }}
      className={`flex items-center justify-center gap-1 border-none cursor-pointer w-full py-1 rounded-full text-xs md:text-sm text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition" ${
        bookStatus ? getStatusColor(bookStatus) : "bg-blue-800"
      }`}
    >
      {bookStatus ? (
        <>
          <HiCheck className="text-xs md:text-sm" />
          {bookStatus === "lido" ? "Lido" : "Quero ler"}
        </>
      ) : (
        <>
          <LuPlus className="text-xs md:text-sm" />
          Adicionar
        </>
      )}
    </button>
  );
};

export default BookActionButton;
