import React, { useEffect, useState } from 'react';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Fetch the list of PDFs from the server
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch('http://localhost:8000/getPdfs'); // Your API endpoint to fetch PDFs
        const result = await response.json();
        setPdfs(result.data); // Assuming response.data is an array of PDF data
        console.log(result.data)
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };
    fetchPdfs();
  }, []);

  // Handle clicking on a PDF to fetch and view it
  const handlePdfClick = (url) => {
    setSelectedPdf(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Available PDFs</h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pdfs.map((pdf) => (
          <li key={pdf._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <button 
              onClick={() => handlePdfClick(pdf.url)}
              className="text-blue-500 font-semibold hover:underline"
            >
              {pdf.fileName}
            </button>
          </li>
        ))}
      </ul>

      {selectedPdf && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Viewing PDF:</h3>
          <iframe
            src={selectedPdf}
            title="PDF Viewer"
            className="w-full h-96 mt-4 border rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
};

export default PdfList;
