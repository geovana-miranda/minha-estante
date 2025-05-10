import Register from "../../components/Register/Register";
import books from "../../assets/books.png";

const imgbooks = books;

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full h-[500px] flex items-center justify-center max-w-3xl mx-auto ">
        <div className="w-full max-w-md h-full flex flex-col items-center justify-center bg-babyblue rounded-l-2xl shadow-xl border border-gray-200">
          <Register />
        </div>
        <div className="w-full max-w-md h-full flex flex-col items-center justify-center rounded-r-2xl shadow-xl bg-babypink border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Organize suas leituras.
          </h2>
          <h3 className="text-lg text-center text-gray-600 mb-6">
            Registre e acompanhe suas leituras com facilidade.
          </h3>
          <img
            src={imgbooks}
            alt="imagem de livros empilhados"
            className="w-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
