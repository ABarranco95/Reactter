import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logOut } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/Login");
  }, [user]);

  return (
    <div
      name="navbar"
      className="bg-blue-500 w-full h-[80px] text-white flex justify-between items-center px-4 "
    >
      <div>
        <h1 className="text-4xl">Reactter</h1>
      </div>

      <ul className="flex">
        <li className="mx-4 px-3 p-1">Profile</li>
      <li><button onClick={logOut} className="bg-white text-gray-600 p-1 px-3 rounded-lg hover:font-bold">Sign Out</button></li>
      </ul>
    </div>
  );
};

export default Navbar;
