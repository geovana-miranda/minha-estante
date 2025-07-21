import ErrorInput from "../../components/FormUser/ErrorInput";

interface ITextareaProps {
  error?: string;
}

const Textarea = ({ error, ...rest }: ITextareaProps) => {
  return (
    <>
      <label className="flex flex-col mb-3 text-sm md:text-base">
        <span>Frase:</span>
        <textarea
          className="w-full h-30 mt-1 px-2 py-1 rounded-2xl text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          {...rest}
        />
      </label>
      {error && <ErrorInput error={error} />}
    </>
  );
};

export default Textarea;
