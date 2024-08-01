import { FC } from 'react';
import { useNavigate } from 'react-router-dom';


// Define the props interface
interface BottomWarningProps {
  text: string;
  atext: string;
  link: string;
}

// Define the BottomWarning component with types
const BottomWarning: FC<BottomWarningProps> = ({ text, atext, link }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h4 className='text-center cursor-pointer'>
        {text}{' '}
        <a
          onClick={() => {
            navigate(link);
          }}
          className='underline'
        >
          {atext}
        </a>
      </h4>
    </div>
  );
};

export default BottomWarning;
