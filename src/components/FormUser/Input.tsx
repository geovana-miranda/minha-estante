import type { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

interface IInputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  maxLength?: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input = ({ label, type, placeholder, maxLength, value, setValue }: IInputProps) => {
  return (
    <label className="w-full flex flex-col mb-3">
      <span className=" font-medium">{label}</span>
      <input
        className="w-full mt-1 px-2 py-1 rounded-2xl text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        required
      />
    </label>
  );
};

export default Input;
