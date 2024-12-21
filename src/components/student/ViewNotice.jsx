import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const ViewNotice = () => {
  const [notices, setNotices] = useState([]); // State to store fetched notices
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.post(
          `https://attendify-backend-qe4c.onrender.com/api/courses/student-courses`,
          { studentId: user?.id }
        );
        console.log(response);

        const courseId = response?.data[0]._id;

        const noticesResponse = await axios.post(
          'https://attendify-backend-qe4c.onrender.com/api/courses/get-notices',
          { courseId }
        );

        setNotices(noticesResponse.data); // Set fetched notices to state

      } catch (error) {
        toast.error('Failed to fetch notices.', { position: 'top-right' });
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center py-6 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">View Notices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 w-full max-w-full">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div
              key={notice._id}
              className="p-6 border border-gray-300 rounded-lg shadow-md flex flex-col mb-4 min-h-[300px]"
            >
              <h3 className="text-xl font-semibold text-gray-800">{notice.title}</h3>
              <p className="text-gray-600 mt-2">{notice.description}</p>
              <div className="mt-4 flex flex-col items-center">
                <p className="text-sm text-gray-500">Sent by: {notice.senderRole}</p>
                <p className="text-sm text-gray-500">On: {new Date(notice.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No notices available.</p>
        )}
      </div>



      <ToastContainer />
    </div>
  );
};

export default ViewNotice;
