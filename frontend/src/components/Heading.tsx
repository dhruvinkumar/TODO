import { FC } from 'react';

// Define the props interface
interface HeadingProps {
  text: string;
  className?: string; // Make className optional
}

// Define the Heading component with types
const Heading: FC<HeadingProps> = ({ text, className }) => {
  return (
    <div>
      <h1 className={`font-bold text-2xl ${className || 'text-center'}`}>{text}</h1>
    </div>
  );
};

export default Heading;
