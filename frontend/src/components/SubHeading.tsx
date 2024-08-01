import { FC } from 'react';

// Define the props interface
interface SubHeadingProps {
  text: string,
  className:string
}

// Define the SubHeading component with types
const SubHeading: FC<SubHeadingProps> = ({ text, className }) => {
  return (
    <h4 className={`text-base  mt-1 ${className || "text-gray-500"}`}>{text}</h4>
  );
};

export default SubHeading;
