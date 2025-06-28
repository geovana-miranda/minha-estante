interface IFormUserProps {
    children: React.ReactNode;
    handleSubmit: React.FormEventHandler<HTMLFormElement>
}

const FormUser = ({handleSubmit, children}:IFormUserProps) => {
  return (
    <form
      className="flex flex-col mt-2 w-full px-10"
      onSubmit={handleSubmit}
    >
        {children}
    </form>
  );
};

export default FormUser;
