import React, { useState } from "react";
import axios from "axios";
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";

const UploadPdfs = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [uploadedURL, setUploadedURL] = useState(null);
  const [fileName, setFileName] = useState(""); // State for file name
  const [grade, setGrade] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value); // Set the file name from input
  };

  const handleUpload = async () => {
    if (!file || !fileName) {
      alert("Please select a file and enter the file name!");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("folder", `PDFs/${grade}`);

    try {
      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          headers: {
            Authorization: `Basic ${btoa("private_HHagI252f2k0m0iudKQ9MKR2dTg=:")}`,
          },
        }
      );
      console.log(response.data.fileId)
      setUploadedURL(response.data.url);
      const fileUrl = response.data.url;
      const fileId = response.data.fileId;

      const firestoreDb = getFirestore(app);
      const classRef = doc(firestoreDb, "classes", grade);
      // Create or update the document in Firestore
      await setDoc(
        classRef,
        {
          Materials: arrayUnion({
            fileUrl,
            fileName, // Saving the file name along with URL
            grade,
            fileId,
          }),
        },
        { merge: true }
      ); // merge: true ensures existing fields are not overwritten

      alert(
        "PDF uploaded successfully and URL with file name saved to Firebase!"
      );
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Error uploading PDF!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg flex ">
      <div className=" shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-100 text-center mb-6">
          Upload Learning Material
        </h1>
        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-100 mb-2"
          >
            Select PDF File
          </label>
          <input
            type="file"
            id="fileInput"
            className="block w-full text-sm p-1 bg-gray-900 border border-gray-100 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fileNameInput"
            className="block text-sm font-medium text-gray-100 mb-2"
          >
            Enter PDF Name
          </label>
          <input
            type="text"
            id="fileNameInput"
            className="block w-full text-sm p-1 bg-gray-800 border border-gray-300 rounded-lg"
            placeholder="e.g., Math Book, Physics Book"
            onChange={handleFileNameChange}
            value={fileName}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="gradeSelect"
            className="block text-sm font-medium text-gray-100 mb-2"
          >
            Select Grade
          </label>
          <select
            id="gradeSelect"
            className="block w-full text-sm p-1 bg-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setGrade(e.target.value)}
          >
            <option hidden>Choose a Grade</option>
            <option value="Grade-9">Grade 9</option>
            <option value="Grade-10">Grade 10</option>
            <option value="Grade-11">Grade 11</option>
            <option value="Grade-12">Grade 12</option>
          </select>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
          onClick={handleUpload}
        >
          {uploading ? "Uploading Please wait" : "Upload"}
        </button>
        <div
          id="uploadedFileLink"
          className="mt-6 text-center text-sm text-gray-500 hidden"
        >
          <a
            href={uploadedURL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Uploaded File
          </a>
        </div>
      </div>
    </div>
  );
};

export default UploadPdfs;
