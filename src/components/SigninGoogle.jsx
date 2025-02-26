import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import React from "react";
import { auth, firestoreDb, provider } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SigninGoogle = ({ text }) => {
  const navigate = useNavigate();
  const signinGoogleAccount = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const localId = result.user.uid;
      if (result) {
        const firestoreRef = doc(firestoreDb, "users", result.user.uid);
        await setDoc(firestoreRef, {
          userName: result.user.displayName,
          userEamil: result.user.email,
          userUid: result.user.uid,
          status: "submitting",
        });

        localStorage.setItem("userId" + localId, localId);
        navigate(`/profile/${localId}`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <button
        className="w-full py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transform transition-transform hover:scale-105 duration-300 mt-2"
        onClick={signinGoogleAccount}
      >
        {text}
      </button>
    </>
  );
};

export default SigninGoogle;
