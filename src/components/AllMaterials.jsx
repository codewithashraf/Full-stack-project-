import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "../firebase";

const AllMaterials = () => {
  const [materials, setMaterials] = useState([]); // Store all materials
  const [grade, setGrade] = useState(""); // Store selected grade
  const [filteredMaterials, setFilteredMaterials] = useState([]); // Store filtered materials

  // ye 3 states delete button ko change karnay kai liye bnai hai
  const [deleting, setDeleting] = useState(false);
  const [deletingName, setDeletingName] = useState(false);
  const [deletingGrade, setDeletingGrade] = useState(false);

  // useEffect mai isliye call kar jab bhi component load hoga to ye function ek dafa run hoga
  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (grade) {
      // Filter materials by selected grade
      const filtered = materials.filter((material) => material.grade === grade);
      setFilteredMaterials(filtered);
    } else {
      setFilteredMaterials(materials); // Show all materials if no grade selected
    }
  }, [grade, materials]);

  // Fetch all materials from Firestore
  const fetchMaterials = async () => {
    const firestoreDb = getFirestore(app);
    const materialsRef = collection(firestoreDb, "classes"); // Referring to the 'classes' collection
    try {
      const querySnapshot = await getDocs(materialsRef);
      const materialsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.Materials) {
          data.Materials.forEach((material) => {
            console.log(material);
            materialsData.push({
              id: doc.id, // Document ID (Grade-9, Grade-10)
              fileUrl: material.fileUrl,
              fileName: material.fileName,
              grade: doc.id, // Grade from Firestore document name
              fileId: material.fileId,
            });
          });
        }
      });
      console.log(materialsData.fileId);
      setMaterials(materialsData); // Save all materials
      setFilteredMaterials(materialsData); // Show all initially
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  // Delete material
  const handleDelete = async (fileUrl, fileGrade, fileName, fileId) => {
    setDeleting(true);
    setDeletingName(fileName);
    setDeletingGrade(fileGrade);
  
    try {
      // Step 1: Delete from Firestore
      const firestoreDb = getFirestore(app);
      const classRef = doc(firestoreDb, "classes", fileGrade);
      const classDoc = await getDoc(classRef);
      const materialsData = classDoc.data().Materials;
      const filteredMaterials = materialsData.filter(
        (material) => material.fileUrl !== fileUrl
      );
  
      await updateDoc(classRef, {
        Materials: filteredMaterials,
      });
  
      // Step 2: Delete from ImageKit.io
      const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${btoa("private_HHagI252f2k0m0iudKQ9MKR2dTg=:")}`, // Replace with your API key
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete file from ImageKit.io");
      }
  
      // Step 3: Update State
      setMaterials((prev) =>
        prev.filter((material) => material.fileUrl !== fileUrl)
      );
      alert("PDF deleted successfully from database and ImageKit.io.");
    } catch (error) {
      console.error("Error deleting PDF:", error);
      alert("Failed to delete the PDF. Please try again.");
    } finally {
      setDeleting(false);
      setDeletingName(false);
      setDeletingGrade(false);
    }
  };
  
  console.log(grade);
  return (
    <div className="min-h-screen w-full ml-[20%] flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          All Learning Materials
        </h1>

        {/* Grade filter */}
        <div className="mb-4">
          <label
            htmlFor="gradeSelect"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Select Grade
          </label>
          <select
            id="gradeSelect"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">All Grades</option>
            <option value="Grade-9">Grade 9</option>
            <option value="Grade-10">Grade 10</option>
            <option value="Grade-11">Grade 11</option>
            <option value="Grade-12">Grade 12</option>
          </select>
        </div>

        {/* Materials list */}
        <div className="space-y-4">
          {filteredMaterials.length === 0 ? (
            <p>No materials found</p>
          ) : (
            filteredMaterials.map((material) => (
              <div
                key={material.fileUrl}
                className="flex items-center justify-between border-b py-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {material.fileName}
                  </p>
                  <a
                    href={material.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View PDF
                  </a>
                </div>
                <button
                  onClick={() =>
                    handleDelete(
                      material.fileUrl,
                      material.grade,
                      material.fileName,
                      material.fileId,
                    )
                  }
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  {deleting &&
                  material.fileName === deletingName &&
                  material.grade === deletingGrade
                    ? "deleting...."
                    : "delete"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMaterials;
