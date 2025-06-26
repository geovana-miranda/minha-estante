import { useAuthContext } from "../../hooks/useAuthContext";

const UserProfileHeader = () => {
  const { currentUser } = useAuthContext();

  const quote = currentUser!.profileQuote;
  const title = currentUser!.profileTitle;
  const photo = currentUser!.profilePhoto;

  return (
    <section className="w-4xl h-auto mx-auto rounded-3xl shadow-xl bg-white relative overflow-hidden">
      <div className=" w-4xl h-36 mx-auto absolute inset-0">
        <img
          src="/books.jpg"
          alt="imagem de capa do perfil do usuário"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-24 mb-6 relative z-10 w-3xl mx-auto flex">
        <div className="mr-4">
          <img
            src={photo}
            alt="foto de perfil do usuário"
            className="w-32 h-32 rounded-full border border-gray-400 shadow"
          />
        </div>
        <div className="flex flex-col justify-end items-start  gap-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm italic">{quote}</p>
        </div>
      </div>
    </section>
  );
};

export default UserProfileHeader;
