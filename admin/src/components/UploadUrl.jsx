import { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../common/SummaryAPI";

const UploadUrl = () => {
  const [entries, setEntries] = useState([]);
  const [resultUrl, setResultUrl] = useState("");
  const [admitCardUrl, setAdmitCardUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch Existing Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SummaryApi.getAdmitcardResult.url);
        setEntries(response.data);
      } catch (error) {
        setMessage("Error fetching data");
      }
    };
    fetchData();
  }, []);

  // Handle Upload (POST Request)
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SummaryApi.getAdmitcardResult.url, {
        resultUrl,
        admitCardUrl,
      });
      setMessage(response.data.message);
      setEntries([...entries, response.data.newEntry]);
    } catch (error) {
      setMessage("Error uploading result");
    }
  };

  // Handle Update (PUT Request)
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(SummaryApi.AdmitcardResult.url.replace(":id",id), {
        resultUrl,
        admitCardUrl,
      });
      setMessage(response.data.message);
      setEntries(entries.map(entry => entry._id === id ? { ...entry, resultUrl, admitCardUrl } : entry));
      setEditingId(null);
      setResultUrl("");
      setAdmitCardUrl("");
    } catch (error) {
      setMessage("Error updating data");
    }
  };

  return (
    <div className="p-6  mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload & Manage Result & Admit Card</h2>
      {message && <p className="text-[#fd645b]">{message}</p>}
      <form className="space-y-4 border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5">
        <input
          type="url"
          placeholder="Result URL"
          value={resultUrl}
          onChange={(e) => setResultUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          placeholder="Admit Card URL"
          value={admitCardUrl}
          onChange={(e) => setAdmitCardUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="button" onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
      <table className="w-full mt-6 border border-gray-300">
        <thead>
          <tr className="bg-[#fd645b] text-white">
            <th className="border p-2">Result URL</th>
            <th className="border p-2">Admit Card URL</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id} className="border">
              <td className="border p-2">{entry.resultUrl}</td>
              <td className="border p-2">{entry.admitCardUrl}</td>
              <td className="border p-2">
                <button
                  onClick={() => {
                    setEditingId(entry._id);
                    setResultUrl(entry.resultUrl);
                    setAdmitCardUrl(entry.admitCardUrl);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                {editingId === entry._id && (
                  <button
                    onClick={() => handleUpdate(entry._id)}
                    className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadUrl;