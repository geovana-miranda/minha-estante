import { useState, type Dispatch, type SetStateAction } from "react";
import { FaStar } from "react-icons/fa";

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
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number | null>(
    rating || null
  );

  const getStarColor = (starNumber: number) => {
    if (hoveredStar != null) {
      return starNumber <= hoveredStar ? "text-amber-400" : "text-gray-400";
    }

    if (selectedStar != null) {
      return starNumber <= selectedStar ? "text-amber-400" : "text-gray-400";
    }

    return "text-gray-400";
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <label className="text-brown font-bold">Avaliar:</label>{" "}
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-4xl transition-colors ${getStarColor(
                star
              )}`}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStar(star);
                setRating(star);
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-brown font-bold">Resenha:</p>
        <textarea
          className="w-full h-20 border border-gray-400 rounded-md p-2 text-sm resize-none"
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
