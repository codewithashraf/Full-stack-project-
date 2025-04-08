import React, { useState } from "react";
import { firestoreDb } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";

function AddStudent() {
  // use location ka use karna hai
  const { state } = useLocation();
  console.log(state)
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
      setAdding(false);
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
    <div className="flex items-center justify-center w-full h-[fit-content] min-h-[100vh] p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-indigo-100 shadow-lg">
      <div className="w-full max-w-md p-8 bg-gray-900 backdrop-blur-[100px] rounded-lg shadow-xl">
        <h1 className="text-4xl max-sm:text-2xl uppercase font-bold mb-6 text-center">
          Add Student
        </h1>
        <form onSubmit={handleFileUpload} className="space-y-6">
          <div>
            <label
              htmlFor="userId"
              className="block font-medium mb-2 text-sm"
            >
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              readOnly
              // onChange={(e) => }
              className="w-full px-4 py-2 sm:py-3 mb-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none max-sm:text-[.8rem] shadow-lg"
            />
          </div>
          <div>
            <label
              htmlFor="studentName"
              className="block font-medium mb-2 text-sm"
            >
              Student Name
            </label>
            <input
              id="studentName"
              type="text"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 mb-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none max-sm:text-[.8rem] shadow-lg capitalize"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNo"
              className="block font-medium mb-2 text-sm"
            >
              Phone Number
            </label>
            <input
              id="phoneNo"
              type="number"
              placeholder="Enter phone number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 mb-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none max-sm:text-[.8rem] shadow-lg"
            />
          </div>
          <div>
            <label htmlFor="file" className="block font-medium mb-2 text-sm">
              Upload Image
            </label>
            <input
              id="file"
              type="file"
              className="w-full px-4 py-2 text-[.8rem] max-sm:text-[.7rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              onChange={handleFile}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-200 hover:text-black  text-white text-lg max-sm:text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
           {adding ? 'Adding please wait......' : 'Add Student' }
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
