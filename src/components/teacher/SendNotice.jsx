import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const SendNotice = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [senderRole, setSenderRole] = useState(); 
  const [senderId, setSenderId] = useState('');
  const [courses, setCourses] = useState([]); // To hold the selected courses for admin
  const [loading, setLoading] = useState(false); // New state for loading
  const user = useSelector((state) => state.user.user);

  useState(() => {
    // setting id and role of user sending notice
    setSenderRole(user?.role);
    setSenderId(user?.id);
  }, []);

  const fetchCourses = async (teacherId) => {
    try {
      const response = await axios.get(`https://attendify-backend-qe4c.onrender.com/api/courses/teacher?teacherId=${teacherId}`);
      setCourses(response.data.map(course => course.name)); // Set courses as names
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch courses.', { position: 'top-right' });
    }
  };

  const handleSendNotice = async () => {
    if (!title || !description || !senderId) {
      toast.error('All fields are required.', { position: 'top-right' });
      return;
    }

    setLoading(true); // Set loading to true when the button is clicked

    try {
      let response;
      if (senderRole === 'admin') {
        // If admin, split the courses by comma and get their IDs
        const courseNames = courses.join(',');
        response = await axios.post(`https://attendify-backend-qe4c.onrender.com/api/courses/admin-notice`,{
          title,
          description,
          senderId,
          courseNames,
          senderRole,
        });
      } else {
        // For teacher, use the existing API
        response = await axios.get(`https://attendify-backend-qe4c.onrender.com/api/courses/teacher?teacherId=${user.id}`);
        const res = await axios.post('https://attendify-backend-qe4c.onrender.com/api/courses/create-notice', {
          title,
          description,
          courseId: response?.data[0]?._id,
          senderId,
          senderRole,
        });
      }

     
      toast.success('Notice sent successfully!', { position: 'top-right' });
    } catch (error) {
      console.log(error);
      toast.error('Failed to send notice.', { position: 'top-right' });
    } finally {
      setLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Notice</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Notice Title</label>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Notice Description</label>
          <textarea
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
          ></textarea>
        </div>
        {senderRole === 'admin' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Courses</label>
            <input
              type="text"
              placeholder="Enter course names separated by commas"
              value={courses.join(',')}
              onChange={(e) => setCourses(e.target.value.split(','))}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
        <button
          onClick={handleSendNotice}
          disabled={loading} // Disable button when loading
          className={`w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Sending...' : 'Send Notice'} {/* Show spinner or text */}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SendNotice;
