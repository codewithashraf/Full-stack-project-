import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";

const LearningMaterials = ({ user }) => {

  const [allPdf, setAllPdf] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, [user]);

  const fetchMaterials = async () => {
    const firebaseDb = getFirestore(app);
    const pdfRef = collection(firebaseDb, "classes");
    try {
      const querySnapshot = await getDocs(pdfRef);
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
            });
          });
        }
      });
      const filterData = materialsData.filter((pdf) => pdf.grade === user.class);
      setAllPdf(filterData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-600">Learning Section</h2>
      <p className="mt-2">All pdfs for {user.class}</p>
      {/* Materials list */}
      <div className="space-y-4">
        {allPdf?.length === 0 ? (
          <p>No materials found</p>
        ) : (
          allPdf &&
          allPdf.map((pdf) => (
            <div
              key={pdf.fileUrl}
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {pdf.fileName}
                </p>
                <a
                  href={pdf.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View PDF
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LearningMaterials;
