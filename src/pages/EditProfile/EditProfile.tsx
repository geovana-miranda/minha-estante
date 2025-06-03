import { useContext, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./EditProfile.module.css";
import type { IUser } from "../../types/types";
import { UsersContext } from "../../context/UsersContext";
import { useAuth } from "../../hooks/useAuth";

const EditProfile = () => {
  const usersContext = useContext(UsersContext);

  if (!usersContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser, setCurrentUser } = useAuth();
  ;
  const { users, setUsers } = usersContext;

  const [name, setName] = useState<string>(currentUser!.name);
  const [email, setEmail] = useState<string>(currentUser!.email);
  // const [password, setPassword] = useState<string>(currentUser!.password);
  const [profilePhoto, setProfilePhoto] = useState<string>(
    currentUser!.profilePhoto
  );
  const [profileTitle, setProfileTitle] = useState<string>(
    currentUser!.profileTitle
  );
  const [profileQuote, setProfileQuote] = useState<string>(
    currentUser!.profileQuote
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputImagemRef = useRef<HTMLInputElement>(null);

  const uploadPhotoProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = e.target.files?.[0];

    if (newPhoto) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
          setProfilePhoto(dataUrl);
        };
      };
      reader.readAsDataURL(newPhoto);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("")

    if (!currentUser) return;
    if (!name && !email && !profileTitle && !profileQuote) return;
    if (
      name === currentUser!.name &&
      email === currentUser!.email &&
      profilePhoto === currentUser!.profilePhoto &&
      profileTitle === currentUser!.profileTitle &&
      profileQuote === currentUser!.profileQuote
    )
      return;

    if (
      users.find(
        (user) =>
          user.email === email && currentUser!.id !== user.id
      )
    ) {
      return setError("Email já cadastrado");
    }

    const editedUser: IUser = {
      ...currentUser,
      name,
      email,
      profilePhoto,
      profileTitle,
      profileQuote,
    };


    setCurrentUser(editedUser);

    setUsers([
      ...users.map((user) => (user.id === currentUser!.id ? editedUser : user)),
    ]);

    setSuccess("Perfil atualizado com sucesso");
    
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <section className="w-md mx-auto p-6 rounded-2xl shadow-xl border border-lightbrown">
        <div className="w-sm mx-auto flex flex-col items-center justify-center px-10">
          <h2 className="text-3xl font-cormorant font-bold text-center text-brown mb-3">
            Editar perfil
          </h2>

          {success && (
            <div className="border-none py-2 px-5 mb-3 bg-[#bbffbe] rounded-3xl">
              <p className="text-sm text-center text-[#00bb00]">{success}</p>
            </div>
          )}

          {error && (
            <div className=" border-none py-2 px-5 mb-3 bg-[#ffbbbb] rounded-3xl">
              <p className="text-sm text-center text-[#ff0000]">{error}</p>
            </div>
          )}

          <div className={styles.containerImagem}>
            <img
              src={profilePhoto}
              alt="foto do usuário"
              className="w-40 h-40 rounded-full border border-lightbrown"
            />

            <div className={styles.overlay}>
              <button onClick={() => inputImagemRef.current!.click()}>
                <MdOutlineEdit />
                <span>Alterar</span>
              </button>
              <input
                type="file"
                accept="image/*"
                ref={inputImagemRef}
                onChange={uploadPhotoProfile}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-5 mb-3">
              <label>
                <span className="font-cormorant italic text-lg font-bold text-brown">Nome </span>
                <input
                  className="w-full mt-1 px-2 py-1 rounded-2xl bg-peach border border-lightbrown focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label>
                <span className="font-cormorant italic text-lg font-bold text-brown">Email </span>
                <input
                  className="w-full mt-1 px-2 py-1 rounded-2xl bg-peach border border-lightbrown focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label>
                <span className="font-cormorant italic text-lg font-bold text-brown">
                  {" "}
                  Título da estante{" "}
                </span>
                <input
                  className="w-full mt-1 px-2 py-1 rounded-2xl bg-peach border border-lightbrown focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  maxLength={40}
                  value={profileTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProfileTitle(e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label>
                <span className="font-cormorant italic text-lg font-bold text-brown"> Frase </span>
                <textarea
                  className="w-full h-30 mt-1 px-2 py-1 rounded-2xl bg-peach border border-lightbrown focus:outline-none focus:ring-2 focus:ring-blue-400"
                  maxLength={140}
                  value={profileQuote}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setProfileQuote(e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <input
              type="submit"
              className="w-full p-3 bg-brown text-white border-none rounded-4xl font-bold cursor-pointer hover:bg-lightbrown"
              value="Salvar"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
