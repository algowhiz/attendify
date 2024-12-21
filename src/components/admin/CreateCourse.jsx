import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CreateCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); // Set loading state to true
        const response = await axios.get(`https://attendify-backend-qe4c.onrender.com/api/courses?adminId=${user.id}`);
        setCourses(response.data);
      } catch (error) {
        console.log(error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchCourses();
    } else {
      setError('You are not authorized to view courses.');
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="spinner">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className='flex justify-center items-center'>
      <img src="/notfound.webp" className='w-52 ' alt="No result found" />
    </div>;
  }

  return (
    <div className="course-container w-full px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">All Courses</h2>
      <div className="course-cards flex flex-col md:flex-row gap-5">
        {courses.map(course => (
          <div
            key={course._id}
            className="course-card bg-white w-full md:w-1/2 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{course.name}</h3>
            <p className="text-gray-700 mb-2">Teacher: {course.teachers.length }</p>
            <p className="text-gray-700 mb-4">Students: {course.students.length}</p>
            <Link
              to={`/courses/${course._id}`}
              className="text-purple-600 font-medium hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

    </div>

  );
};

export default CreateCourse;
