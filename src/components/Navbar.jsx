import React from "react";

const Navbar = () => {
  return (
    <div
      name="navbar"
      className="bg-blue-500 w-full h-[80px] text-white flex justify-between items-center px-4 "
    >
      <div>
        <h1 className="text-4xl">Reactter</h1>
      </div>

      <ul className="flex">
        <li className="mx-4">Profile</li>
        <li>Sign out</li>
      </ul>
    </div>
  );
};

export default Navbar;
