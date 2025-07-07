interface ISubmitButton {
  value: string;
}

const SubmitButton = ({ value }: ISubmitButton) => {
  return (
    <>
      <input
        type="submit"
        value={value}
        className="text-sm md:text-base mt-3 w-full bg-blue-800 hover:bg-blue-600 text-white py-2 rounded-3xl transition duration-200 cursor-pointer"
      />
    </>
  );
};

export default SubmitButton;
