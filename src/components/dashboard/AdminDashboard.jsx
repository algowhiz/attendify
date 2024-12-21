import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaPlusSquare, FaChalkboardTeacher } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import CreateClassModal from "../admin/CreateClassModal";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Utils/Sidebar";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const createCourse = async (courseName) => {
    if (!courseName.trim()) {
      toast.error("Course name is required.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("https://attendify-backend-qe4c.onrender.com/api/courses", {
        name: courseName,
        adminId: user.id,
      });
      console.log(response);
      
      toast.success("Course created successfully!");
      setIsModalOpen(false);
      setCourseName("");
      window.location.reload();
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to create course. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: <FaTachometerAlt />, href: "/admin/dashboard" },
    { name: "Create Class / Course", icon: <FaPlusSquare />, href: "/admin/create-course" },
        { name: "Send Notices", icon: <FaChalkboardTeacher />, href: "send-notices" },
    { name: "Logout", icon: <CiLogin />, onClick: handleLogout },
  ];

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <Sidebar
        title="Admin Panel"
        links={sidebarLinks}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64 w-full h-screen transition-all duration-300">
        <header className="flex justify-between items-center mb-6">
          <button
            className="sm:hidden text-gray-800 mr-3 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars size={24} />
          </button>

          <div className="flex justify-between w-full items-center gap-3 md:gap-6">
            <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap text-gray-800">
              Admin Dashboard
            </h1>
            <button
              className="bg-purple-600 text-sm font-semibold md:text-base p-2 md:px-4 md:py-2 text-white rounded hover:bg-purple-700"
              onClick={() => setIsModalOpen(true)}
            >
              + Class
            </button>
          </div>
        </header>

        <Outlet />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CreateClassModal
          setCourseName={setCourseName}
          courseName={courseName}
          createCourse={createCourse}
          setIsModalOpen={setIsModalOpen}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
