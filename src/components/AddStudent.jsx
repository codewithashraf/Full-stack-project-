import React, { useState } from "react";
import { getDatabase, ref, remove, set } from "firebase/database";
import { app } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

function AddStudent() {
  // use location ka use karna hai
  const { state } = useLocation();
  console.log(state.userUid);

  const navigate = useNavigate();
  const [userId, setUserId] = useState(state.userUid);
  const [studentName, setStudentName] = useState(state.userName);
  const [phoneNo, setPhoneNo] = useState(state.userPhoneNumber);
  const [image, setImage] = useState(null);

  // add button per animation kai liye 
  const [adding, setAdding] = useState(false)

  // Handle image file selection
  const handleFile = (event) => {
    setImage(event.target.files[0]);
  };

  // Upload file and save student data
  const handleFileUpload = async (e) => {
    e.preventDefault();
    setAdding(true)
    if (!userId || !studentName || !phoneNo || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ashraf");
      formData.append("folder", "student_images");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhzxq0zgr/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      const publicId = response.data.public_id;

      // firestore data update
      const firestoreDb = getFirestore(app);
      const userRef = doc(firestoreDb, "users", userId);
      await updateDoc(userRef, {
        status: "Approved",
        publicId,
        imageUrl,
      });

      alert("Student added successfully! and pending data deleted");
      navigate("/dashboard/StudentList");
    } catch (error) {
      console.error("Error uploading image or saving data:", error.message);
      alert("An error occurred. Please try again.");
    } finally {
      // Reset form
      setUserId("");
      setStudentName("");
      setPhoneNo("");
      setImage(null);
      setAdding(false)
    }
  };

  return (
    <div className="flex justify-center w-[80%] ml-[20%]  items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-50 backdrop-blur-[100px] rounded-lg shadow-xl">
        <h1 className="text-4xl uppercase font-bold mb-6 text-center text-white">
          Add Student
        </h1>
        <form onSubmit={handleFileUpload} className="space-y-6">
          <div>
            <label
              htmlFor="userId"
              className="block text-gray-700 mb-2 text-sm"
            >
              User ID
            </label>
            <input
              id="userId"
              type="text"
              placeholder="Enter user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full text-black px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="studentName"
              className="block text-gray-700 mb-2 text-sm"
            >
              Student Name
            </label>
            <input
              id="studentName"
              type="text"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full text-black px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNo"
              className="block text-gray-700 mb-2 text-sm"
            >
              Phone Number
            </label>
            <input
              id="phoneNo"
              type="number"
              placeholder="Enter phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full text-black px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-gray-700 mb-2 text-sm">
              Upload Image
            </label>
            <input
              id="file"
              type="file"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              onChange={handleFile}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-200 hover:text-black  text-white text-lg font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
           {adding ? 'Adding please wait......' : 'Add Student' }
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
