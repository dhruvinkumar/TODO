import { FC, ChangeEvent } from 'react';

// Define the props interface
interface InputBoxProps {
  heading: string;
  placeholder: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Define the InputBox component with types
const InputBox: FC<InputBoxProps> = ({ heading, placeholder, type, onChange }) => {
  return (
    <div className="my-4">
      <label className="block font-bold text-gray-700 mb-2">{heading}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        required
      />
    </div>
  );
};

export default InputBox;
