interface IFormUserProps {
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement>
}

const FormUser = ({onSubmit, children}:IFormUserProps) => {
  return (
    <form
      className="flex flex-col mt-2 w-full px-10"
      onSubmit={onSubmit}
    >
        {children}
    </form>
  );
};

export default FormUser;
