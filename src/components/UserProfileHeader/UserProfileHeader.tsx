import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserProfileHeader = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser } = authContext;

  const quote = currentUser!.profileQuote;
  const title = currentUser!.profileTitle;
  const photo = currentUser!.profilePhoto;

  return (
    <>
      <div className="w-4xl h-auto mx-auto bg-amber-50 py-10 mt-10 rounded-2xl shadow-xl border border-gray-200">
        <div className="w-2xl mx-auto flex flex-col">
          <div className="w-2xl flex items-center justify-center gap-10">
            <img
              src={photo}
              alt="imagem do usuário"
              className="w-40 h-40 rounded-full"
            />
            <h2 className="text-3xl font-bold text-blue-950">{title}</h2>
          </div>
          <div className="mt-5 flex justify-center">
            <p className="text-lg font-crimson italic text-gray-700">{quote}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileHeader;
