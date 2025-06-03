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
      <section className="w-4xl h-auto mx-auto  py-10 rounded-3xl shadow-xl border border-lightbrown">
        <div className="w-2xl mx-auto flex flex-col">
          <div className="w-2xl flex flex-col items-center justify-center gap-2">
            <img
              src={photo}
              alt="foto do usuário"
              className="w-40 h-40 rounded-full border border-lightbrown"
            />
            <h2 className="text-4xl font-bold text-brown">{title}</h2>
          </div>
          <div className="mt-5 flex justify-center">
            <p className="text-xl text-center font-crimson italic text-lightbrown">
              {quote}
            </p>
          </div>
        </div>
      </section>
  );
};

export default UserProfileHeader;
