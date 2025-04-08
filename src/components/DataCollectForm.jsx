import React, { useState } from "react";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase";

const DataCollectForm = ({ user }) => {
  
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    legalName: "",
    fatherName: "",
    age: '',
    phoneNumber: "",
    address: "",
    grade: "",
  });
console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit data
      console.log("Form Data Submitted: ", formData);

      // firestore data update
      const userRef = doc(firestoreDb, "users", user.userUid);
       updateDoc(userRef, {
        status: "pending",
        age: formData.age.trim(),
        class: formData.grade.trim(),
      });

      // firestore new instance grade wise
      const classRef = doc(firestoreDb, formData.grade, user.userUid)
      setDoc(classRef, {
        name: formData.legalName.trim(),
        fatherName: formData.fatherName.trim(),
        address: formData.address.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        class: formData.grade.trim(),
        age: formData.age.trim(),
      })
    }
  };

  return (
    <div className="min-h-screen px-4 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h2 className="text-3xl font-extrabold text-white text-center mb-6 tracking-wider">Registration Form</h2>
      <form onSubmit={handleSubmit} className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full text-white space-y-4">
        {/* Legal Name */}
        <div>
          <label className="block font-medium">Legal Name</label>
          <input
            type="text"
            name="legalName"
            value={formData.legalName}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.legalName ? "border-red-500" : "border-gray-300"
            } rounded-md text-gray-900 focus:ring-2 focus:ring-white`}
          />
          {errors.legalName && <p className="text-red-200 text-sm">{errors.legalName}</p>}
        </div>
  
        {/* Father Name */}
        <div>
          <label className="block font-medium">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.fatherName ? "border-red-500" : "border-gray-300"
            } rounded-md text-gray-900 focus:ring-2 focus:ring-white`}
          />
          {errors.fatherName && <p className="text-red-200 text-sm">{errors.fatherName}</p>}
        </div>

        {/* user ki age */}
        <div>
          <label className="block font-medium">Your Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.fatherName ? "border-red-500" : "border-gray-300"
            } rounded-md text-gray-900 focus:ring-2 focus:ring-white`}
          />
          {errors.age && <p className="text-red-200 text-sm">{errors.age}</p>}
        </div>
  
        {/* Phone Number */}
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md text-gray-900 focus:ring-2 focus:ring-white`}
          />
          {errors.phoneNumber && <p className="text-red-200 text-sm">{errors.phoneNumber}</p>}
        </div>
  
        {/* Address */}
        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md text-gray-900 focus:ring-2 focus:ring-white`}
          ></textarea>
          {errors.address && <p className="text-red-200 text-sm">{errors.address}</p>}
        </div>
  
        {/* Grade */}
        <div>
          <label className="block font-medium">Class/Grade</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className={`w-full p-2 border ${
              errors.grade ? "border-red-500" : "border-gray-300"
            } rounded-md text-gray-900 focus:ring-2 focus:ring-white`}
          >
            <option value="">Select Grade</option>
            <option value="Grade-9">Grade 9</option>
            <option value="Grade-10">Grade 10</option>
            <option value="Grade-11">Grade 11</option>
            <option value="Grade-12">Grade 12</option>
          </select>
          {errors.grade && <p className="text-red-200 text-sm">{errors.grade}</p>}
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-white text-pink-500 font-semibold p-2 rounded-lg hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
  
  
};

export default DataCollectForm;
