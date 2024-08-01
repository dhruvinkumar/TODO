import { FC } from 'react';
import Heading from "./Heading";

// Define the user type
interface User {
  name: string;
}

// Define the props interface
interface AppbarProps {
  user?: User;
}

// Define the Appbar component with types
const Appbar: FC<AppbarProps> = ({ user }) => {
  const name = user?.name || ' ';

  return (
    <div className="flex items-center justify-between w-full shadow-md p-5">
      <div>
        <Heading text="ToDo App" />
      </div>
      <div className="flex items-center justify-between">
        <div className="hidden sm:flex items-center justify-center px-4 font-bold">
          Hello, {name}
        </div>
        <div className="w-10 h-10 rounded-full bg-[#45ADFF] text-gray-100 flex items-center justify-center border border-[#008FFF]">
          {name[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
