import { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../common/SummaryAPI";
const baseUrl = import.meta.env.VITE_BACKEND_URL;
const HeroImage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(SummaryApi.carouselImg.url);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    setLoading(true);

    try {
      await axios.post(SummaryApi.carouselImg.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
      setFile(null);
      setTitle("");
      setDescription("");
      fetchImages();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(SummaryApi.DeleteCarouselImg.url.replace(":id", id));
        alert("Image deleted successfully!");
        fetchImages();
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete image");
      }
    }
  };

  return (
    <div className=" mx-auto bg-white  shadow-md rounded-lg p-6 gap-8 w-full mt-10">
      <h2 className="text-4xl font-semibold text-gray-700 mb-4 t">
          Upload Slider Image
        </h2>
      <div className="border  border-[#fe0000] rounded-xl border-r-4 border-b-4 p-2">
        
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3"
        />
        <p className="text-sm text-gray-500 mb-3">
          Recommended size:{" "}
          <span className="font-semibold">1920 × 1080 px</span>
        </p>
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-primary hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Display Images Table */}
      <div className="mt-6 bg-white ">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Uploaded Images
        </h3>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-primary text-white">
              <th className=" p-2">Image</th>
              {/* <th className=" p-2">Title</th>
              <th className=" p-2">Description</th> */}
              <th className=" p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.length > 0 ? (
              images.map((img) => (
                <tr key={img._id} className="text-center">
                  <td className="border p-2">
                    <img
                      src={`${baseUrl}/${img.image}`}
                      alt={img.title}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  {/* <td className="border p-2">{img.title}</td>
                  <td className="border p-2">{img.description}</td> */}
                  <td className="border p-2">
                    <button
                      className="bg-primary text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(img._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border p-4 text-center text-gray-500"
                >
                  No images uploaded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeroImage;
