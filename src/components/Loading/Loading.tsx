const Loading = () => {
  return (
    <div className="mx-auto flex flex-col items-center gap-2">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
      <span className="text-xl mb-6 text-center">
        Carregando...
      </span>
    </div>
  );
};

export default Loading;
