import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { signin } = useAuth();

  const handlePassFieldChanges = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPass(event.target.value);
  };

  const handleEmailFieldChanges = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const handleAuthClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    signin(email, pass);
  };

  return (
    <>
      <div className="main">
        <p>ログイン</p>
        <br />
        <input
          value={email}
          onChange={handleEmailFieldChanges}
          placeholder="email"
        />
        <input
          value={pass}
          onChange={handlePassFieldChanges}
          placeholder="pass"
        />
        <button onClick={handleAuthClick}>Login</button>
      </div>
    </>
  );
};

export default Home;
