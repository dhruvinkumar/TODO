import { FC, useState, ChangeEvent } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from '@/components/Heading';
import SubHeading from '@/components/SubHeading';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import BottomWarning from '@/components/BottomWarning';

const Signup: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [name, setname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    axios
      .post("http://localhost:3000/api/v1/user/signup", {
        username,
        password,
        name
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        }
      })
      .catch(() => {
        setErr("Invalid Input");
      });
  };

  return (
    <div className="p-5 h-screen w-full flex items-center justify-center">
      <div className="border border-gray-400 p-5 rounded-xl">
        <Heading text="Sign Up" />
        <SubHeading text="Enter your information to create an account" />

        <div className="mt-4">
         
          <InputBox
            heading="Name"
            placeholder="Doe"
            type="text"
            onChange={handleLastnameChange}
          />
          <InputBox
            heading="Email"
            placeholder="johndoe@example.com"
            type="email"
            onChange={handleUsernameChange}
          />
          <InputBox
            heading="Password"
            type="password"
            placeholder="*******"
            onChange={handlePasswordChange}
          />
        </div>

        <Button onClick={handleSignup} text="Sign up" />
        {err && <div className="text-center text-red-600 font-semibold">{err}</div>}
        <BottomWarning text="Already have an account?" atext="Sign In" link="/signin" />
      </div>
    </div>
  );
};

export default Signup;
