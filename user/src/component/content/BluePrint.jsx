import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryApi from '../../common/SummaryApi';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const BlueprintsPage = () => {
  const [blueprints, setBlueprints] = useState([]);

  useEffect(() => {
    const fetchBlueprints = async () => {
      try {
        const response = await axios.get(SummaryApi.Blueprintget.url);
        setBlueprints(response.data);
      } catch (error) {
        console.error('ब्लूप्रिंट प्राप्त करने में त्रुटि:', error);
      }
    };
    fetchBlueprints();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-12 py-8">
      <h2 className="text-xl sm:text-4xl font-bold mb-4 text-primary text-center">ब्लूप्रिंट</h2>
      {blueprints.length === 0 ? (
        <p className="text-center text-gray-500">कोई ब्लूप्रिंट उपलब्ध नहीं है।</p>
      ) : (
        <ul className="space-y-4">
          {blueprints.map((blueprint, index) => (
            <li key={index} className="flex justify-between bg-white p-4 shadow-md border-l-4 border-red-500">
              <a
                href={`${baseUrl}${blueprint.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" font-medium "
              >
                {blueprint.title || `Blueprint ${index + 1}`}
              </a>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = `${baseUrl}${blueprint.filePath}`;
                  link.setAttribute('download', `Blueprint_${index + 1}.pdf`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="ml-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-red-700"
              >
                डाउनलोड करें
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlueprintsPage;
