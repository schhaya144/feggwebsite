import React, { useState } from 'react';

const DonateOptions = ({ heading, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to the parent component when the form is submitted
  };

  return (
    <div className="p-6 bg-gray-100  rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-lime-700">{heading}:</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="number">
            Whatsapp Number :
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-md font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DonateOptions;
