import Login from "./components/Login";
import Navbar from "./components/Navbar";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch;

  return (
    <div>
      <Navbar />
      <Login />
    </div>
  );
}

export default App;
