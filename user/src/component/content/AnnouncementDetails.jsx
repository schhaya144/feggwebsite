
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const AnnouncementDetails = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/announcements/${id}`);
        setAnnouncement(response.data);
      } catch (error) {
        setError("घोषणा लोड करने में असफल।");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (loading) return <p className="text-center text-lg">लोड हो रहा है...</p>;
  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;
  if (!announcement) return <p className="text-center text-lg">घोषणा उपलब्ध नहीं है।</p>;

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 lg:px-12 py-8">
      <div className=" w-full border-2 border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden ">
        {/* Header Section */}
        <div className="relative bg-gray-100 border-b-2 border-gray-300 py-6 flex items-center px-6">
          <div className="absolute top-0 left-0 bg-primary text-white text-center w-16 h-16 flex flex-col justify-center rounded-br-lg font-bold shadow-md">
            {(() => {
              const dateObj = new Date(announcement.date);
              const day = dateObj.getDate();
              const month = dateObj.toLocaleString("hi-IN", { month: "long" });
              return (
                <>
                  <span className="text-xl">{day}</span>
                  <span className="text-sm">{month}</span>
                </>
              );
            })()}
          </div>
          <h3 className="ml-20 text-gray-800 font-semibold text-xl leading-tight">{announcement.title}</h3>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col sm:flex-row gap-6 items-center">
  {/* Description */}
  <div className="flex-1 text-gray-700 text-sm leading-relaxed sm:w-1/2">
    <p className="mb-4">{announcement.description}</p>
    {announcement.pdf && (
      <a
        href={`${baseUrl}/uploads/${announcement.pdf}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-white bg-primary w-full py-2 text-center text-sm rounded-md hover:bg-red-600 transition"
      >
        PDF देखें
      </a>
    )}
  </div>

  {/* Image */}
  {announcement.image && (
    <img
      src={`${baseUrl}/uploads/${announcement.image}`}
      alt="घोषणा"
      className="w-full sm:w-1/2 h-96 object-cover rounded-lg shadow-md"
    />
  )}
</div>

      </div>
    </div>
  );
};

export default AnnouncementDetails;
