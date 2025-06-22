import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./EditProfile.module.css";
import type { IUser } from "../../types/types";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUsersContext } from "../../hooks/useUsersContext";
import useUploadPhoto from "../../hooks/useUploadPhoto";

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const { users, setUsers } = useUsersContext();

  const [form, setForm] = useState({
    name: currentUser!.name,
    email: currentUser!.email,
    profilePhoto: currentUser!.profilePhoto,
    profileTitle: currentUser!.profileTitle,
    profileQuote: currentUser!.profileQuote,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputImagemRef = useRef<HTMLInputElement>(null);
  const { photo, uploadPhotoProfile } = useUploadPhoto();

  useEffect(() => {
    if (photo) {
      setForm((prev) => ({ ...prev, profilePhoto: photo }));
    }
  }, [photo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!currentUser) return;
    if (
      form.name === currentUser!.name &&
      form.email === currentUser!.email &&
      form.profilePhoto === currentUser!.profilePhoto &&
      form.profileTitle === currentUser!.profileTitle &&
      form.profileQuote === currentUser!.profileQuote
    )
      return;

    if (
      users.find(
        (user) => user.email === form.email && currentUser!.id !== user.id
      )
    ) {
      return setError("Email já cadastrado");
    }

    const editedUser: IUser = {
      ...currentUser,
      ...form,
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
              src={form.profilePhoto}
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
                <span className="font-cormorant italic text-lg font-bold text-brown">
                  Nome{" "}
                </span>
                <input
                  className="w-full mt-1 px-2 py-1 rounded-2xl bg-peach border border-lightbrown focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label>
                <span className="font-cormorant italic text-lg font-bold text-brown">
                  Email{" "}
                </span>
                <input
                  className="w-full mt-1 px-2 py-1 rounded-2xl bg-peach border border-lightbrown focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
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
                  name="profileTitle"
                  value={form.profileTitle}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="mb-3">
              <label>
                <span className="font-cormorant italic text-lg font-bold text-brown">
                  {" "}
                  Frase{" "}
                </span>
                <textarea
                  className="w-full h-30 mt-1 px-2 py-1 rounded-2xl bg-peach border border-lightbrown focus:outline-none focus:ring-2 focus:ring-blue-400"
                  maxLength={140}
                  name="profileQuote"
                  value={form.profileQuote}
                  onChange={handleChange}
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
