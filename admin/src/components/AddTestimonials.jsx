import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTestimonials = () => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:8006/api/testimonial');
      setTestimonials(response.data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !author || !image) {
      setError('All fields are required!');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('text', text);
    formData.append('author', author);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8006/api/testimonial', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setText('');
      setAuthor('');
      setImage(null);
      setTestimonials([...testimonials, response.data]); // Update list
    } catch (err) {
      setError('Failed to add testimonial');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8006/api/testimonial/${id}`);
      setTestimonials(testimonials.filter((item) => item._id !== id)); // Remove deleted item
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Testimonial</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 border border-[#fd645b] rounded-xl border-r-4 border-b-4 p-5">
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Testimonial text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Author name..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="w-full bg-[#fd645b] text-white p-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Testimonial'}
        </button>
      </form>

      {/* Testimonials Table */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Testimonials</h3>
        <table className="w-full border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-[#fd645b] text-white">
              <th className="border p-2">Image</th>
              <th className="border p-2">Text</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border p-2">
                  <img src={`http://localhost:8006${item.image}`} alt="testimonial" className="w-16 h-16 object-cover mx-auto" />
                </td>
                <td className="border p-2">{item.text}</td>
                <td className="border p-2">{item.author}</td>
                <td className="border p-2">
                  <button
                    className="bg-[#fd645b] text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddTestimonials;
