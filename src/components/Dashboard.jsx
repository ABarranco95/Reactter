import React , {useState, useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logOut } from "../firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) navigate('/Login');
  }, [user]);

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <button
          className="font-bold text-xl bg-red-500 rounded-lg p-1"
          onClick={() => logOut(auth)}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
