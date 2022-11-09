import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logOut } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  query,
  collection,
  getDocs,
  where,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
} from "firebase/firestore";
import Login from "./Login";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [feed, setFeed] = useState([]);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    if (user) {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        alert("An error occured while fetching user data");
      }
    }
  };

  const addPost = async (text) => {
    try {
      await addDoc(collection(db, "users", user.uid, "posts"), {
        timestamp: serverTimestamp(),
        name: name,
        post: text,
        uid: user.uid,
      });
    } catch (error) {
      alert(error);
    }
  };

  const getFeed = () => {
    onSnapshot(collection(db, "users",), (snapshot) => {
      setFeed(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })))
      // console.log(feed);
    });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/Login");
    fetchUserName();
    getFeed();
  }, [user, feed]);

  return user ? (
    <div>
      {/* <Navbar /> */}
      <div className="flex flex-col justify-start items-center w-full h-screen bg-slate-400">
        <h1 className="mt-8">Welcome back {name}</h1>

        <div>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-blue-400 text-white rounded-2xl px-5 py-2 mt-4"
            onClick={() => addPost(text)}
          >
            Add Post
          </button>
        </div>
        <div>
          <button onClick={logOut}>Sign Out</button>
        </div>
      </div>
      <div>This is my feed</div>
    </div>
  ) : (
    <div></div>
  );
};

export default Dashboard;
