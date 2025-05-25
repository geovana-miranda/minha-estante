import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./EditProfile.module.css";
import type { IUser } from "../../types/types";
import { UsersContext } from "../../context/UsersContext";

const EditProfile = () => {
  const usersContext = useContext(UsersContext);
  const authContext = useContext(AuthContext);

  if (!usersContext || !authContext) {
    throw new Error("Register deve estar dentro de <UsersProvider>");
  }

  const { currentUser, setCurrentUser } = authContext;
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
      <section className="w-md mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <div className="w-sm mx-auto flex flex-col items-center justify-center px-10">
          <h2 className="text-2xl font-bold text-center text-navy mb-3">
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
              alt="imagem do usuário"
              className="w-40 h-40 rounded-full"
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
            <div className="mt-5 mb-5">
              <label>
                <span className="font-bold text-gray-800">Nome </span>
                <input
                  className="w-full italic mt-1 px-2 py-1 rounded-2xl bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className="mb-5">
              <label>
                <span className="font-bold text-gray-800">Email </span>
                <input
                  className="w-full italic mt-1 px-2 py-1 rounded-2xl bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className="mb-5">
              <label>
                <span className="font-bold text-gray-800">
                  {" "}
                  Título da estante{" "}
                </span>
                <input
                  className="w-full italic mt-1 px-2 py-1 rounded-2xl bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

            <div className="mb-5">
              <label>
                <span className="font-bold text-gray-800"> Frase </span>
                <textarea
                  className="w-full italic h-30 mt-1 px-2 py-1 rounded-2xl bg-white border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full p-3 bg-navy text-white border-none rounded-4xl font-bold cursor-pointer hover:bg-[#3f51b5]"
              value="Salvar"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
