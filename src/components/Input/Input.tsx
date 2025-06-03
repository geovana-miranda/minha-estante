import type { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

interface IInputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input = ({ label, type, placeholder, value, setValue }: IInputProps) => {
  return (
    <label className="w-[250px] flex flex-col mb-3">
      <span className="text-lg text-brown font-cormorant italic font-bold">{label}</span>
      <input
        className="w-full mt-1 px-2 py-1 rounded-2xl bg-peach border border-lightbrown focus:outline-none focus:ring-2 focus:ring-blue-400"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        required
      />
    </label>
  );
};

export default Input;
