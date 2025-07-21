import type { HTMLInputTypeAttribute } from "react";
import ErrorInput from "./ErrorInput";

interface IInputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  maxLength?: number;
  error?: string;
}

const Input = ({
  label,
  type,
  placeholder,
  maxLength,
  error,
  ...rest
}: IInputProps) => {
  return (
    <>
      <label className="w-full flex flex-col mb-3 text-sm md:text-base">
        <span>{label}</span>
        <input
          className={`w-full mt-1 px-2 py-1 rounded-2xl text-gray-700 bg-gray-100 border ${
            error
              ? "border-red-600 focus:ring-red-400 "
              : "border-gray-300 focus:ring-2 focus:ring-blue-400"
          } focus:outline-none `}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          {...rest}
        />
      </label>
      {error && <ErrorInput error={error} />}
    </>
  );
};

export default Input;
