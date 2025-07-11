import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./EditProfile.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import useUploadPhoto from "../../hooks/useUploadPhoto";
import Input from "../../components/FormUser/Input";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import useEditUser from "../../hooks/useEditUser";

const EditProfile = () => {
  const { currentUser } = useAuthContext();

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
  const inputImagemRef = useRef<HTMLInputElement>(null);
  const { photo, uploadPhotoProfile } = useUploadPhoto();

  const { editUser, error, success } = useEditUser();

  useEffect(() => {
    if (photo) {
      setProfilePhoto(photo);
    }
  }, [photo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editedUser = editUser({
      name,
      email,
      profilePhoto,
      profileTitle,
      profileQuote,
    });
    if (!editedUser) return;

    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <section className="w-84 md:w-md mx-auto my-3 bg-white p-6 rounded-2xl shadow border border-gray-300">
        <div className="w-full mx-auto flex flex-col items-center justify-center px-10">
          <h2 className="md:text-xl font-bold text-center  mb-3">Editar perfil</h2>

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
              className="w-24 md:w-36 md:h-36 rounded-full"
            />

            <div className={styles.overlay}>
              <button onClick={() => inputImagemRef.current!.click()}>
                <MdOutlineEdit />
                <span className="text-xs md:text-base">Alterar</span>
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

          <form className="flex flex-col mt-2 w-full" onSubmit={handleSubmit}>
            <Input label="Nome:" type="text" value={name} setValue={setName} />
            <Input
              label="Email:"
              type="email"
              value={email}
              setValue={setEmail}
            />
            <Input
              label="Título da estante:"
              type="text"
              value={profileTitle}
              setValue={setProfileTitle}
              maxLength={40}
            />

            <div>
              <label className="flex flex-col mb-3 text-sm md:text-base">
                <span>Frase:</span>
                <textarea
                  className="w-full h-30 mt-1 px-2 py-1 rounded-2xl text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  maxLength={140}
                  name="profileQuote"
                  value={profileQuote}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setProfileQuote(e.target.value)
                  }
                  required
                />
              </label>
            </div>
            <SubmitButton value="Salvar" />
          </form>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
