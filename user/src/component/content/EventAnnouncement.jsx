// src/components/EventsAnnouncements.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../../common/SummaryApi";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const EventsAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(SummaryApi.getAnnouncements.url);
        setAnnouncements(response.data);
      } catch (error) {
        setError("घोषणाएँ लोड करने में असफल।");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h2 className="text-lg sm:text-3xl font-bold mb-4 text-primary text-center">
        कार्यक्रम और घोषणाएँ
      </h2>

      {loading ? (
        <p>घोषणाएँ लोड हो रही हैं...</p>
      ) : error ? (
        <p className="text-primary">{error}</p>
      ) : announcements.length === 0 ? (
        <p>कोई घोषणा उपलब्ध नहीं है।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="announcement-card  bg-white shadow-md flex flex-col transition hover:scale-105 hover:bg-gray-50"
          >
            <Link to={`/announcement/${announcement._id}`}>
            {/* तारीख बॉक्स और शीर्षक */}
            <div className=" relative h-16 flex items-center">
              
              <div className="absolute -top-2 -left-2 bg-[#FD645B] text-white text-center w-16 h-16 flex flex-col justify-center font-bold">
                {(() => {
                  const dateObj = new Date(announcement.date);
                  const day = dateObj.getDate();
                  const month = dateObj.toLocaleString("hi-IN", {
                    month: "long",
                  });
                  return (
                    <>
                      <span className="text-lg">{day}</span>
                      <span className="text-sm">{month}</span>
                    </>
                  );
                })()}
              </div>
              <h3 className="text-gray-800 font-semibold pl-24 pr-4 ">
                {announcement.title}
              </h3>
            </div>
            </Link>
           
          </div>
        ))}
      </div>
      
      )}
    </div>
  );
};

export default EventsAnnouncements;
