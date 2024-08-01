import { FC, MouseEvent } from 'react';

// Define the props interface
interface ButtonProps {
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

// Define the Button component with types
const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#45ADFF] ... w-full my-2 px-4 py-2 text-white font-semibold rounded-lg shadow-mdfocus:outline-none focus:ring-2 focus:ring-[#008FFF] focus:ring-opacity-50"
    >
      {text}
    </button>
  );
};

export default Button;
