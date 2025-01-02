import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayPDFs = () => {
    const [grade, setGrade] = useState("Grade-9"); // Default grade
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch PDFs from Cloudinary
    const fetchPdfs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.cloudinary.com/v1_1/dhzxq0zgr/resources/search`, // Replace 'your_cloud_name'
                {
                    params: {
                        expression: `folder:PDFs AND resource_type:raw`,
                        max_results: 10, // Fetch 10 PDFs at a time
                    },
                    headers: {
                        Authorization: `Basic ${btoa("138922128752222:ASUYmvRXOQAI6PB6oUX70BeGtBA")}`,
                    },
                }
            );

            setPdfs(response.data.resources); // Set fetched PDFs
        } catch (error) {
            console.error("Error fetching PDFs:", error);
            alert("Failed to load PDFs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch PDFs when grade changes
    useEffect(() => {
        fetchPdfs();
    }, [grade]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Learning Materials
                </h1>

                {/* Grade Selection */}
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
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    >
                        <option value="Grade-9">Grade 9</option>
                        <option value="Grade-10">Grade 10</option>
                    </select>
                </div>

                {/* Loading Indicator */}
                {loading && <p className="text-gray-500">Loading PDFs...</p>}

                {/* PDF List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pdfs.map((pdf) => (
                        <div
                            key={pdf.public_id}
                            className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                        >
                            <h2 className="text-sm font-medium text-gray-700 mb-2">
                                {pdf.public_id.split("/").pop()} {/* Show PDF name */}
                            </h2>
                            <a
                                href={pdf.secure_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-4 rounded-lg text-center"
                            >
                                Read PDF
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayPDFs;
