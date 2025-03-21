// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SummaryApi from '../common/SummaryAPI';
// const baseUrl = import.meta.env.VITE_BACKEND_URL;

// const CourseForm = () => {
//   const [courses, setCourses] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     duration: '',
//     batch: '',
//     fee: '',
//   });
//   const [banner, setBanner] = useState(null);
//   const [editingCourseId, setEditingCourseId] = useState(null);
//   const [editingCourse, setEditingCourse] = useState({});

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get(SummaryApi.getCourses.url);
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleBannerChange = (e) => {
//     setBanner(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const courseData = new FormData();
//     courseData.append('title', formData.title);
//     courseData.append('duration', formData.duration);
//     courseData.append('batch', formData.batch);
//     courseData.append('fee', formData.fee);
//     if (banner) {
//       courseData.append('banner', banner);
//     }

//     try {
//       const response = await axios(
//         {
//           url: SummaryApi.addCourse.url,
//           method: SummaryApi.addCourse.method,
//           data: courseData,
//         },
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       );
//       setCourses([...courses, response.data]);
//       setFormData({ title: '', duration: '', batch: '', fee: '' });
//       setBanner(null);
//     } catch (error) {
//       console.error('Error adding course:', error);
//     }
//   };

//   const handleEditInputChange = (e, field) => {
//     const { value } = e.target;
//     setEditingCourse((prevCourse) => ({ ...prevCourse, [field]: value }));
//   };

//   const handleEdit = (course) => {
//     setEditingCourseId(course._id);
//     setEditingCourse(course);
//   };

//   const handleCancelEdit = () => {
//     setEditingCourseId(null);
//     setEditingCourse({});
//   };

//   const handleSaveEdit = async () => {
//     try {
//       const updatedData = new FormData();
//       updatedData.append('title', editingCourse.title);
//       updatedData.append('duration', editingCourse.duration);
//       updatedData.append('batch', editingCourse.batch);
//       updatedData.append('fee', editingCourse.fee);
//       if (banner) {
//         updatedData.append('banner', banner);
//       }

//       const response = await axios.put(
//         SummaryApi.updateCourse.url.replace(':id', editingCourseId), // Replace :id with actual course ID
//         updatedData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       );

//       setCourses(
//         courses.map((course) =>
//           course._id === editingCourseId ? response.data : course
//         )
//       );
//       handleCancelEdit(); // Exit editing mode
//     } catch (error) {
//       console.error('Error updating course:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${SummaryApi.deleteCourse.url.replace(':id', id)}`);
//       setCourses(courses.filter((course) => course._id !== id));
//     } catch (error) {
//       console.error('Error deleting course:', error);
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Create New Course</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="title" className="block text-gray-700 font-medium">
//               Course Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={editingCourseId ? editingCourse.title : formData.title}
//               onChange={(e) =>
//                 editingCourseId
//                   ? handleEditInputChange(e, 'title')
//                   : handleChange(e)
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="duration"
//               className="block text-gray-700 font-medium"
//             >
//               Duration
//             </label>
//             <input
//               type="text"
//               id="duration"
//               name="duration"
//               value={
//                 editingCourseId ? editingCourse.duration : formData.duration
//               }
//               onChange={(e) =>
//                 editingCourseId
//                   ? handleEditInputChange(e, 'duration')
//                   : handleChange(e)
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label htmlFor="batch" className="block text-gray-700 font-medium">
//               Batch
//             </label>
//             <input
//               type="text"
//               id="batch"
//               name="batch"
//               value={editingCourseId ? editingCourse.batch : formData.batch}
//               onChange={(e) =>
//                 editingCourseId
//                   ? handleEditInputChange(e, 'batch')
//                   : handleChange(e)
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label htmlFor="fee" className="block text-gray-700 font-medium">
//               Fee
//             </label>
//             <input
//               type="text"
//               id="fee"
//               name="fee"
//               value={editingCourseId ? editingCourse.fee : formData.fee}
//               onChange={(e) =>
//                 editingCourseId
//                   ? handleEditInputChange(e, 'fee')
//                   : handleChange(e)
//               }
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label htmlFor="banner" className="block text-gray-700 font-medium">
//               Banner
//             </label>
//             <input
//               type="file"
//               id="banner"
//               name="banner"
//               onChange={handleBannerChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
//         >
//           {editingCourseId ? 'Save' : 'Create Course'}
//         </button>
//       </form>

//       <h2 className="text-2xl font-bold mt-6 mb-4">Courses</h2>

//       <table className="w-full table-auto border-collapse border border-gray-400">
//         <thead>
//           <tr>
//             <th className="border border-gray-400 px-4 py-2">S.No</th>
//             <th className="border border-gray-400 px-4 py-2">Course Title</th>
//             <th className="border border-gray-400 px-4 py-2">Duration</th>
//             <th className="border border-gray-400 px-4 py-2">Batch</th>
//             <th className="border border-gray-400 px-4 py-2">Fee</th>
//             <th className="border border-gray-400 px-4 py-2">Banner</th>
//             <th className="border border-gray-400 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map((course, index) => (
//             <tr key={course._id}>
//               <td className="border border-gray-400 px-4 py-2 text-center">
//                 {index + 1}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {editingCourseId === course._id ? (
//                   <input
//                     type="text"
//                     value={editingCourse.title}
//                     onChange={(e) => handleEditInputChange(e, 'title')}
//                     className="w-full px-2 py-1 border border-gray-300 rounded"
//                   />
//                 ) : (
//                   course.title
//                 )}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {editingCourseId === course._id ? (
//                   <input
//                     type="text"
//                     value={editingCourse.duration}
//                     onChange={(e) => handleEditInputChange(e, 'duration')}
//                     className="w-full px-2 py-1 border border-gray-300 rounded"
//                   />
//                 ) : (
//                   course.duration
//                 )}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {editingCourseId === course._id ? (
//                   <input
//                     type="text"
//                     value={editingCourse.batch}
//                     onChange={(e) => handleEditInputChange(e, 'batch')}
//                     className="w-full px-2 py-1 border border-gray-300 rounded"
//                   />
//                 ) : (
//                   course.batch
//                 )}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {editingCourseId === course._id ? (
//                   <input
//                     type="text"
//                     value={editingCourse.fee}
//                     onChange={(e) => handleEditInputChange(e, 'fee')}
//                     className="w-full px-2 py-1 border border-gray-300 rounded"
//                   />
//                 ) : (
//                   course.fee
//                 )}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {course.banner && (
//                   <img
//                     src={`http://localhost:5000${course.banner}`}
//                     alt={course.title}
//                     className="w-16 h-16 object-cover"
//                   />
//                 )}
//               </td>
//               <td className="border border-gray-400 px-4 py-2">
//                 {editingCourseId === course._id ? (
//                   <>
//                     <button
//                       onClick={handleSaveEdit}
//                       className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => handleEdit(course)}
//                       className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(course._id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CourseForm;

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SummaryApi from '../common/SummaryAPI'
const baseUrl = import.meta.env.VITE_BACKEND_URL

const CourseForm = () => {
  const [courses, setCourses] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    batch: '',
    fee: '',
  })
  const [banner, setBanner] = useState(null)
  const [editingCourseId, setEditingCourseId] = useState(null)
  const [editingCourse, setEditingCourse] = useState({})

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get(SummaryApi.getCourses.url)
      setCourses(response.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleBannerChange = (e) => {
    setBanner(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const courseData = new FormData()
    courseData.append('title', formData.title)
    courseData.append('duration', formData.duration)
    courseData.append('batch', formData.batch)
    courseData.append('fee', formData.fee)
    if (banner) {
      courseData.append('banner', banner)
    }

    try {
      const response = await axios(
        {
          url: SummaryApi.addCourse.url,
          method: SummaryApi.addCourse.method,
          data: courseData,
        },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      setCourses([...courses, response.data])
      setFormData({ title: '', duration: '', batch: '', fee: '' })
      setBanner(null)
    } catch (error) {
      console.error('Error adding course:', error)
    }
  }

  const handleEditInputChange = (e, field) => {
    const { value } = e.target
    setEditingCourse((prevCourse) => ({ ...prevCourse, [field]: value }))
  }

  const handleEdit = (course) => {
    setEditingCourseId(course._id)
    setEditingCourse(course)
  }

  const handleCancelEdit = () => {
    setEditingCourseId(null)
    setEditingCourse({})
  }

  const handleSaveEdit = async () => {
    try {
      const updatedData = new FormData()
      updatedData.append('title', editingCourse.title)
      updatedData.append('duration', editingCourse.duration)
      updatedData.append('batch', editingCourse.batch)
      updatedData.append('fee', editingCourse.fee)
      if (banner) {
        updatedData.append('banner', banner)
      }

      const response = await axios.put(
        SummaryApi.updateCourse.url.replace(':id', editingCourseId),
        updatedData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      setCourses(
        courses.map((course) =>
          course._id === editingCourseId ? response.data : course
        )
      )
      handleCancelEdit() // Exit editing mode
    } catch (error) {
      console.error('Error updating course:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SummaryApi.deleteCourse.url.replace(':id', id)}`)
      setCourses(courses.filter((course) => course._id !== id))
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-800 to-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 border-b border-gray-600 pb-2">
        Create New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: 'Course Title',
              value: formData.title,
              setValue: handleChange,
              name: 'title',
            },
            {
              label: 'Duration',
              value: formData.duration,
              setValue: handleChange,
              name: 'duration',
            },
            {
              label: 'Batch',
              value: formData.batch,
              setValue: handleChange,
              name: 'batch',
            },
            {
              label: 'Fee',
              value: formData.fee,
              setValue: handleChange,
              name: 'fee',
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={
                  editingCourseId ? editingCourse[field.name] : field.value
                }
                onChange={(e) => field.setValue(e)}
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label htmlFor="banner" className="block text-sm font-medium mb-1">
              Banner
            </label>
            <input
              type="file"
              name="banner"
              onChange={handleBannerChange}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:ring focus:ring-blue-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-r hover:from-teal-500 hover:to-blue-600 text-white py-2 rounded-lg font-bold"
        >
          {editingCourseId ? 'Save Course' : 'Create Course'}
        </button>
      </form>

      <h2 className="text-3xl font-bold mt-6 mb-4 border-b border-gray-600 pb-2">
        Courses
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left text-sm border border-gray-600">
          <thead className="bg-gray-700">
            <tr>
              {[
                'S.No',
                'Course Title',
                'Duration',
                'Batch',
                'Fee',
                'Banner',
                'Actions',
              ].map((header) => (
                <th key={header} className="px-4 py-2 border-b border-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={course._id} className="hover:bg-gray-700">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => handleEditInputChange(e, 'title')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    course.title
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourse.duration}
                      onChange={(e) => handleEditInputChange(e, 'duration')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    course.duration
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourse.batch}
                      onChange={(e) => handleEditInputChange(e, 'batch')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    course.batch
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourse.fee}
                      onChange={(e) => handleEditInputChange(e, 'fee')}
                      className="w-full bg-gray-700 p-1 rounded text-white border border-gray-600"
                    />
                  ) : (
                    course.fee
                  )}
                </td>
                <td className="px-4 py-2">
                  {course.banner && (
                    <img
                      src={`${baseUrl}/${course.banner}`}
                      alt={course.title}
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingCourseId === course._id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(course)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseForm
