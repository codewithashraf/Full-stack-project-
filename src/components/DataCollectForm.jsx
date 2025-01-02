import React, { useState } from "react";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase";

const DataCollectForm = ({ user }) => {
  
  const [formData, setFormData] = useState({
    legalName: "",
    fatherName: "",
    phoneNumber: "",
    address: "",
    grade: "",
  });

  const [errors, setErrors] = useState({});
  console.log(formData.grade === 'Grade 10')
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
      console.log(user.userUid);
      // firestore data update
      const db = getFirestore(app);
      const userRef = doc(db, "users", user.userUid);
       updateDoc(userRef, {
        status: "pending",
        class: formData.grade,
      });

      const classRef = doc(db, formData.grade, user.userUid)
      setDoc(classRef, {
        name: formData.legalName,
        fatherName: formData.fatherName,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        class: formData.grade
      })
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Student Registration Form
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Legal Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Legal Name
          </label>
          <input
            type="text"
            name="legalName"
            value={formData.legalName}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.legalName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.legalName && (
            <p className="text-red-500 text-sm mt-1">{errors.legalName}</p>
          )}
        </div>

        {/* Father Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Father's Name
          </label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.fatherName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Grade */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Class/Grade
          </label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.grade ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Grade</option>
            <option value="Grade-9">Grade 9</option>
            <option value="Grade-10">Grade 10</option>
            <option value="Grade-11">Grade 11</option>
            <option value="Grade-12">Grade 12</option>
          </select>
          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataCollectForm;
