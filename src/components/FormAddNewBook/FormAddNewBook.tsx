import { type Dispatch, type SetStateAction } from "react";
import Stars from "./Stars";

interface IFormAddNewBook {
  rating: number | null;
  setRating: Dispatch<SetStateAction<number | null>>;
  review: string;
  setReview: Dispatch<SetStateAction<string>>;
}

const FormAddNewBook = ({
  rating,
  setRating,
  review,
  setReview,
}: IFormAddNewBook) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <label className="font-bold">Avaliar:</label>{" "}
        <Stars rating={rating} setRating={setRating} />
      </div>
      <div>
        <p className="font-bold">Resenha:</p>
        <textarea
          className="w-full h-20 border border-gray-400 rounded-md p-2 text-xs md:text-sm resize-none"
          maxLength={240}
          value={review}
          placeholder="Escreva sua resenha aqui..."
          onChange={(e) => setReview(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </>
  );
};

export default FormAddNewBook;
