import { useState, type Dispatch, type SetStateAction } from "react";
import { FaStar } from "react-icons/fa";

interface IStarsProps {
  rating: number | null;
  setRating: Dispatch<SetStateAction<number | null>>;
}

const Stars = ({ rating, setRating }: IStarsProps) => {
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
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer text-xl md:text-4xl transition-colors ${getStarColor(
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
  );
};

export default Stars;
