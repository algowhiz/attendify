import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Utils/Spinner';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `https://attendify-backend-qe4c.onrender.com/api/auth/login`,
        {
          emailId: formData?.email,
          password: formData?.password,
        }
      );
      const userRole = response.data?.user?.role;
      dispatch(
        setUser({
          _id: response.data?.user?._id,
          username: response?.data?.user?.username,
          email: response?.data?.user?.email,
          role: userRole,
          token: response?.data?.token,
        })
      );
      toast.success('User logged in successfully!');

      // Navigate based on role
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'teacher') {
        navigate('/teacher/dashboard');
      } else if (userRole === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/'); // Default route if no role is defined
      }
    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err?.response?.data?.message || 'An error occurred.');
        toast.error(err?.response?.data?.message || 'An error occurred.');
      } else {
        setError('Failed to connect to the server. Please try again.');
        toast.error('Failed to connect to the server. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-auto shadow-xl w-[80vw] md:w-[400px] bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center "
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Login'}
            </button>

          </div>
        </form>
        <ToastContainer />
        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
