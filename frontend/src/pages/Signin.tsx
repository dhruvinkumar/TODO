import { FC, useState, ChangeEvent } from 'react';
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    axios.post("http://localhost:3000/api/v1/user/signin", {
      username,
      password,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", `Bearer ${res.data.token}`);
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
        <Heading text="Sign In" />
        <SubHeading text="Enter your credentials to access your account" />
        <InputBox
          heading="Email"
          type="email"
          placeholder="johndoe@example.com"
          onChange={handleUsernameChange}
        />
        <InputBox
          heading="Password"
          type="password"
          placeholder="*******"
          onChange={handlePasswordChange}
        />
        <Button onClick={handleSignIn} text="Sign In" />
        {err && <div className="text-center text-red-600 font-semibold">{err}</div>}
        <BottomWarning text="Don't have an account?" atext="Sign Up" link="/signup" />
      </div>
    </div>
  );
};

export default Signin;
