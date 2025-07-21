import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./EditProfile.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import useUploadPhoto from "../../hooks/useUploadPhoto";
import Input from "../../components/FormUser/Input";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import useEditUser from "../../hooks/useEditUser";
import { useForm } from "react-hook-form";
import Textarea from "./Textarea";

interface IFormInputTypes {
  name: string;
  email: string;
  profileTitle: string;
  profileQuote: string;
}

const EditProfile = () => {
  const { currentUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputTypes>({
    mode: "all",
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      profileTitle: currentUser?.profileTitle,
      profileQuote: currentUser?.profileQuote,
    },
  });

  const [profilePhoto, setProfilePhoto] = useState<string>(
    currentUser!.profilePhoto
  );
  const inputImagemRef = useRef<HTMLInputElement>(null);
  const { photo, uploadPhotoProfile } = useUploadPhoto();

  const { editUser, error, success } = useEditUser();

  useEffect(() => {
    if (photo) {
      setProfilePhoto(photo);
    }
  }, [photo]);

  const submitForm = ({
    name,
    email,
    profileTitle,
    profileQuote,
  }: IFormInputTypes) => {
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
          <h2 className="md:text-xl font-bold text-center mb-3">
            Editar perfil
          </h2>

          {success && (
            <div className="border-none py-2 px-5 mb-3 bg-[#bbffbe] rounded-3xl">
              <p className="text-sm text-center text-[#00bb00]">{success}</p>
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

          <form
            className="flex flex-col mt-2 w-full"
            onSubmit={handleSubmit(submitForm)}
          >
            <Input
              label="Nome:"
              type="text"
              error={errors.name?.message}
              {...register("name", {
                required: "Por favor, insira o seu nome",
              })}
            />
            <Input
              label="Email:"
              type="email"
              error={error || errors.email?.message}
              {...register("email", {
                required: "Por favor, insira o seu email",
              })}
            />
            <Input
              label="Título da estante:"
              type="text"
              error={errors.profileTitle?.message}
              {...register("profileTitle", {
                required: "Por favor, insira um título para sua estante",
                maxLength: {
                  value: 40,
                  message: "O título deve ter até 40 caracteres",
                },
              })}
            />

            <Textarea
              error={errors.profileQuote?.message}
              {...register("profileQuote", {
                required: false,
                maxLength: {
                  value: 140,
                  message: "O título deve ter até 140 caracteres",
                },
              })}
            />

            <SubmitButton value="Salvar" />
          </form>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
