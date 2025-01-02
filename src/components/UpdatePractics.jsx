import React, { useState } from "react";
// import axios from "axios";
import { app } from "../firebase"; // Firebase import
import { collection, getFirestore, doc, addDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

function PracticsComponent() {
  const navigate = useNavigate()
  const {state} = useLocation()
  console.log(state.id)
  const [studentName, setStudentName] = useState(state.student_name);
  const [studentNO, setStudentNO] = useState(state.student_no);
  const [image, setImage] = useState(null)

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
      setImage(event.target.files[0]); // Set new file to state
    };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // debugger

    const db = getFirestore(app);

    if(!image) {
      const docRef = doc(db, "student-data", state.id)
      await updateDoc(docRef, {
        student_name: studentName,
        student_no: studentNO,
      });
      return 
    } 

    

    const formData = new FormData()
    formData.append('file', image);
    formData.append('upload_preset', 'ashraf')
    formData.append('folder', 'practics-images')

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dhzxq0zgr/image/upload',
      formData
    )

    const imageURL = response.data.secure_url
    const publicId = response.data.public_id

    // save data from firestore database
    
    const docRef = doc(db, "student-data", state.id)
    await updateDoc(docRef, {
      student_name: studentName,
      student_no: studentNO,
      student_image: imageURL,
      imageId: publicId,
    });

    
    const publicImageId = state.imageId;
    if (publicImageId) deleteImageFromCloudinary(publicImageId); // Delete previous image
  
  };

 

  

  return (
    <>
      <div className="w-full h-screen bg-slate-500 text-white">
        <h1>firestore practics</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-96 h-96 bg-slate-500 text-black flex flex-col gap-4"
        >
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            type="number"
            value={studentNO}
            onChange={(e) => setStudentNO(e.target.value)}
          />
          <input type="file" onChange={handleFile} />
          <button type="submit" onClick={() => navigate('/practics')}>submit</button>
        </form>
      </div>
      
    </>
  );
}

export default PracticsComponent;
