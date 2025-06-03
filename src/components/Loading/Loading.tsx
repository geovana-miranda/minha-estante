const Loading = () => {
  return (
    <div className="mx-auto flex flex-col items-center gap-2">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-lightbrown"></div>
      <span className="text-xl italic text-brown mb-6 text-center">
        Carregando...
      </span>
    </div>
  );
};

export default Loading;
