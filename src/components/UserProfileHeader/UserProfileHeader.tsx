import { useAuthContext } from "../../hooks/useAuthContext";

const UserProfileHeader = () => {
  const { currentUser } = useAuthContext();

  const quote = currentUser!.profileQuote;
  const title = currentUser!.profileTitle;
  const photo = currentUser!.profilePhoto;

  return (
    <section className="w-84 md:w-2xl lg:w-4xl h-auto mx-auto border border-gray-300 rounded-3xl shadow bg-white relative overflow-hidden">
      <div className="w-full h-20 md:h-28 lg:h-36 mx-auto absolute inset-0">
        <img
          src="/books.jpg"
          alt="imagem de capa do perfil do usuário"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-84 md:w-xl lg:w-3xl flex flex-col items-center md:items-end md:flex-row mt-12 md:mt-20 lg:mt-24 mb-6 relative z-10 mx-auto">
        <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mr-4">
          <img
            src={photo}
            alt="foto de perfil do usuário"
            className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded-full border border-gray-400 shadow"
          />
        </div>
        <div className="w-84 md:w-96 lg:w-xl flex flex-col items-center lg:justify-end md:items-start gap-1 md:mb-2">
          <h2 className="text-lg lg:text-2xl font-bold">{title}</h2>
          <p className="text-center md:text-start text-xs lg:text-sm italic">{quote}</p>
        </div>
      </div>
    </section>
  );
};

export default UserProfileHeader;