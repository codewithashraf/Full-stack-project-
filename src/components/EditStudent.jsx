import React, { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

function EditStudent() {
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state?.[1].userUid)

  // Initial States
  const [userId, setUserId] = useState(state?.[1].userUid);
  const [studentName, setStudentName] = useState(state?.[1].userName);
  const [phoneNo, setPhoneNo] = useState(state?.[1].userPhoneNumber);
  const [image, setImage] = useState(state?.[1].imageUrl);

  // Generate Cloudinary Signature
  const generateSignature = (publicId) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = "Ug9UGmbQJ6AUywHEdX7DqkzMuAU";
    const signature = CryptoJS.SHA1(
      `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    ).toString(CryptoJS.enc.Hex);
    return { timestamp, signature };
  };

  // Delete Image from Cloudinary
  const deleteImageFromCloudinary = async (publicId) => {
    if (!publicId) return;
    try {
      const { timestamp, signature } = generateSignature(publicId);
      await axios.post("https://api.cloudinary.com/v1_1/dhzxq0zgr/image/destroy", {
        public_id: publicId,
        api_key: "441222599391147",
        timestamp,
        signature,
      });
      console.log("Previous image deleted from Cloudinary.");
    } catch (error) {
      console.error("Error deleting previous image:", error);
    }
  };

  // Handle File Input
  const handleFile = (event) => {
    const publicId = state?.[1]?.studentPublicId;
    if (publicId) deleteImageFromCloudinary(publicId); // Delete previous image
    setImage(event.target.files[0]); // Set new file to state
  };

  // Handle Form Submission
  const handleFileUpload = async (e) => {
    e.preventDefault();

    try {
      const db = getDatabase(app);

      // Update without Image
      if (!image) {
        await update(ref(db, `approved-student/${userId}`), {
          studentName,
          studentNumber: phoneNo,
        });
        console.log("Data updated without image.");
        navigate("/dashboard/StudentList");
        return;
      }

      // Image Upload
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

      // Update Firebase with new Image
      await update(ref(db, `approved-student/${userId}`), {
        studentName,
        studentNumber: phoneNo,
        imageUrl,
        studentPublicId: publicId,
      });

      console.log("Data updated with image.");
      navigate("/dashboard/StudentList");
    } catch (error) {
      console.error("Error uploading or updating data:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex  items-center justify-center w-full h-[fit-content] min-h-[100vh] p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-indigo-100 shadow-lg">
      <div className="w-full max-w-md p-8 bg-gray-900 backdrop-blur-[100px] rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Edit Student
      </h1>
      <form onSubmit={handleFileUpload} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block font-medium mb-1">
            User ID
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            readOnly
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 mb-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none max-sm:text-[.8rem] shadow-lg"
          />
        </div>

        <div>
          <label htmlFor="student-name" className="block font-medium mb-1">
            Student Name
          </label>
          <input
            id="student-name"
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 mb-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none max-sm:text-[.8rem] shadow-lg capitalize"
          />
        </div>

        <div>
          <label htmlFor="phone-number" className="block font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phone-number"
            type="number"
            placeholder="Enter phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 mb-3 bg-white/20 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-indigo-100 outline-none max-sm:text-[.8rem] shadow-lg"
          />
        </div>

        <div>
          <label htmlFor="file" className="block font-medium mb-1">
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
          Edit Student
        </button>
      </form>
    </div>
    </div>
  );
}

export default EditStudent;
