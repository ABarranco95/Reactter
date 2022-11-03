import React , {useState, useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logOut } from "../firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import Login from './Login';

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("")
  const navigate = useNavigate();

  const fetchUserName = async () => {
    if (user) {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }

    }
  };



  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/Login');
    fetchUserName();
  }, [user]);

  return (user) ? (
    <div>
      <div>
        <h1>Welcome back {name}</h1>
        <button
          className="font-bold text-xl bg-red-500 rounded-lg p-1"
          onClick={logOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  )
};

export default Dashboard;
