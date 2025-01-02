import React, { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

function EditStudent() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Initial States
  const [userId, setUserId] = useState(state?.[0]);
  const [studentName, setStudentName] = useState(state?.[1].studentName);
  const [phoneNo, setPhoneNo] = useState(state?.[1].studentNumber);
  const [image, setImage] = useState(null);

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-500 text-black rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Edit Student
      </h1>
      <form onSubmit={handleFileUpload} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-gray-600 mb-1">
            User ID
          </label>
          <input
            id="userId"
            type="number"
            placeholder="Enter user ID"
            value={userId}
            disabled
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="student-name" className="block text-gray-600 mb-1">
            Student Name
          </label>
          <input
            id="student-name"
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="phone-number" className="block text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            id="phone-number"
            type="number"
            placeholder="Enter phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-gray-600 mb-1">
            Upload Image
          </label>
          <input
            id="file"
            type="file"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFile}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Edit Student
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
