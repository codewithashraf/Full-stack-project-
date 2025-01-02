import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import fetchUserProfile from "./UserService";
import UserPendingStatus from "./UserPendingStatus";
import ApprovedProfile from "./ApprovedProfile";
import DataCollectForm from "./DataCollectForm";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import AccountStatus from "./Deleted";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth(app);

  const userId = sessionStorage.getItem('userId')

  const handleSaveProfile = (save) => {
    if (save) {
      
      sessionStorage.setItem('student_logged_in', 'login hai student')

      console.log("Profile data saved in localStorage!");
    } else {
      sessionStorage.setItem("student_logged_in", "");
      console.log("User chose not to save profile");
    }
    setShowModal(false); // Close modal
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        let userData;
        if(currentUser.uid === userId) {
          userData = await fetchUserProfile(currentUser.uid);
        }
        else{
          userData = await fetchUserProfile(userId);
        }
        setStatus(userData.status);

        const firestoreDb = getFirestore(app);
        const firestoreUserRef = doc(firestoreDb, "users", userData.userUid);
        const unSubscribe = onSnapshot(firestoreUserRef, (doc) => {
          if (doc.exists()) {
            setUser(doc.data());
            setStatus(doc.data().status); // Update the status in real-time
          }
        });

        if (userData.status === "Approved") {
          let loginValue = sessionStorage.getItem('student_logged_in')
          console.log(loginValue !== 'true')
          if(loginValue !== 'true') return 'not value'
          setShowModal(true); // Open modal for confirmation
        } else if (userData.status === "deleted") {
          console.log("account delete hogaye hai oo ");
        }

        return () => unSubscribe();
      }
    });

    return () => unSubscribe();
  }, []);

  return (
    <>
      {/* Modal: Alert-style UI */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-whtie bg-opacity-30 z-50">
          <div className="bg-blue-300 absolute top-0 right-0 rounded-lg shadow-lg p-2 w-11/12 max-w-[15rem] text-center">
            <p className="text-md font-thin mb-4">
              Do you want to save your profile for future visits?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSaveProfile(true)}
                className="px-3 py-1 font-bold bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Yes
              </button>
              <button
                onClick={() => handleSaveProfile(false)}
                className="px-3 py-1 font-bold bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conditional Rendering for Main Content */}
      {!user ? (
        <h1 className="absolute top-[35%] left-[40%] text-[6vw] text-white ">
          Loading .............
        </h1>
      ) : status === "submitting" ? (
        <DataCollectForm user={user} />
      ) : status === "deleted" || status === "suspend" ? (
        <AccountStatus user={user} />
      ) : status === "pending" ? (
        <UserPendingStatus user={user} />
      ) : (
        <ApprovedProfile user={user} />
      )}
    </>
  );
};

export default Profile;
