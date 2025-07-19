import { FaStar } from "react-icons/fa";


const FavoriteStars = ({rating}: {rating: number | null}) => {
  const getStarColor = (star: number) => {
    if (rating) {
      return star <= rating ? "text-amber-400" : "text-gray-400";
    }
    return "text-gray-400";
  };
  return (
    <div className="w-20 md:w-28 flex md:my-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} className={`text-3xl ${getStarColor(star)}`} />
      ))}
    </div>
  );
};

export default FavoriteStars;
