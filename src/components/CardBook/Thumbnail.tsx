interface IThumbnailProps {
  thumbnail?: string;
  title: string;
}

const Thumbnail = ({ thumbnail, title }: IThumbnailProps) => {
  return (
    <div className="w-20 h-32 md:w-28 md:h-42 mt-3 shrink-0">
      <img
        className="w-full h-full object-cover"
        src={thumbnail || "/semcapa.jpg"}
        alt={`Capa do livro ${title}`}
      />
    </div>
  );
};

export default Thumbnail;
