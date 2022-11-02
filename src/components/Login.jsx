import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailAndPassword } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="w-full h-[800px] flex flex-col justify-center items-center">
      <div className="my-4">
        <p className="text-4xl font-bold">Welcome Back!</p>
      </div>
      <div className="flex flex-col mx-4 my-4">
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-200 flex my-4 p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-200 flex my-4 p-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => signInWithEmailAndPassword(email, password)} className="flex my-4 p-3 rounded bg-white border-2 border-black items-center justify-center font-bold hover:bg-blue-500 hover:text-white hover:border-blue-500">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
