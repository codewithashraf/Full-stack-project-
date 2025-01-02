import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js"; // Import crypto-js
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function StudentList() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);

  const db = getDatabase(app);

  const fetchData = () => {
    useEffect(() => {
      const studentRef = ref(db, "approved-student");
      const unsubscribeOnValue = onValue(studentRef, (snapShot) => {
        console.log(snapShot.val());
        // setStudentData(snapShot.val());
      });

      // firestore say data fetch kar rhe hain
      const firestoreDb = getFirestore(app);
      const firestoreDataRef = collection(firestoreDb, "users");
      const unSubscribe = onSnapshot(firestoreDataRef, (snapShot) => {
        const approvedStudent = snapShot.docs
          .filter((doc) => doc.data().status === "Approved")
          .map((doc) => doc.data());
        setStudentData(Object.entries(approvedStudent));
      });

      // clean up onvalue listener
      return () => unsubscribeOnValue();
    }, []);
  };

  fetchData();

  // Function to generate Cloudinary signature using crypto-js
  const generateSignature = (publicId) => {
    const timestamp = Math.round(new Date().getTime() / 1000); // Current Unix timestamp
    const apiSecret = "Ug9UGmbQJ6AUywHEdX7DqkzMuAU"; // Your Cloudinary API Secret
    const signature = CryptoJS.SHA1(
      `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    ).toString(CryptoJS.enc.Hex);

    return { timestamp, signature };
  };

  const deleteImageFromCloudinary = async (publicId) => {
    try {
      const { timestamp, signature } = generateSignature(publicId);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dhzxq0zgr/image/destroy`,
        {
          public_id: publicId,
          api_key: "441222599391147", // Your Cloudinary API key
          timestamp: timestamp,
          signature: signature,
        }
      );
      console.log("Image Deleted:", response.data);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const deleteData = async (key) => {
    const db = getFirestore(app);
    // class say data delete karwa rhe hai

    const deleteRef = doc(
      db,
      studentData[key][1].class,
      studentData[key][1].userUid
    );
    await deleteDoc(deleteRef)
      .then((res) => console.log("data deleted"))
      .catch((err) => console.log("data not deleted: " + err.message));

    const publicID = studentData[key][1].publicId;
    if (publicID) {
      deleteImageFromCloudinary(publicID);

      const studentRef = doc(db, "users", studentData[key][1].userUid);
      updateDoc(studentRef, {
        status: "deleted",
      });
    } else {
      console.error("Public ID missing for student:", key);
    }
  };

  return (
    <div className="w-full h-[fit-content] min-h-[100vh] ml-[20%] p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <h1 className="text-4xl font-bold text-indigo-100 mb-8 text-center">
        Student List
      </h1>
      {studentData !== null && studentData.length !== 0 ? (
        studentData.map(([key, val]) => (
          <div
            key={val.userUid}
            className="mb-6 p-6 border border-gray-300 rounded-lg bg-gradient-to-br from-gray-600 to-indigo-800 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex items-center">
              {val.imageUrl && (
                <img
                  src={val.imageUrl}
                  alt="Student"
                  className="w-16 h-16 rounded-full object-cover mr-6"
                />
              )}
              <div>
                <h2 className="text-3xl capitalize font-semibold">
                  {val.userName}
                </h2>
                <h3 className="text-xl">{val.phoneNumber}</h3>
                <h3 className="text-xl mt-1"> {val.class}</h3>
              </div>
            </div>
            <div className="mt-6 flex justify-start space-x-6">
              <button
                onClick={() => deleteData(key)}
                className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  navigate("/dashboard/EditStudent", { state: [key, val] })
                }
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-2xl text-white">No students found...</p>
      )}
    </div>
  );
}

export default StudentList;
