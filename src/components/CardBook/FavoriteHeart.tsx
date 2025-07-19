import { FaHeart } from "react-icons/fa";


interface IFavoriteHeartProps {
  favorited: boolean;
  favoriteBook: (e: React.MouseEvent<SVGElement, globalThis.MouseEvent>) => void;
}

const FavoriteHeart = ({ favorited, favoriteBook }: IFavoriteHeartProps) => {
  return (
    <div className="absolute top-0 right-2 text-gray-300 cursor-pointer">
      <FaHeart
        className={`text-2xl md:text-3xl ${
          favorited ? "text-red-600" : "text-gray-400"
        }`}
        onClick={(e) => favoriteBook(e)}
      />
    </div>
  );
};

export default FavoriteHeart;
