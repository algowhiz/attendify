import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import Sidebar from "../Utils/Sidebar";

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    setTimeout(() => {
      navigate("/login"); // Redirect
    }, 0);
  };

  // Sidebar links for students
  const sidebarLinks = [
    { name: "Dashboard", icon: <FaUserGraduate />, href: "dashboard" },
    { name: "View Notice", icon: <FaChalkboardTeacher />, href: "view-notice" },
    { name: "Logout", icon: <CiLogin />, onClick: handleLogout },
  ];

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <Sidebar
        title="Student Panel"
        links={sidebarLinks}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 sm:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="flex justify-around items-center mb-6">
          <button
            className="sm:hidden text-gray-800 mr-3 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars size={24} />
          </button>

          <div className="flex justify-between w-full items-center gap-3 md:gap-6">
            <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap text-gray-800">
              Student Dashboard
            </h1>
          </div>
        </header>

        {/* Outlet for rendering child components */}
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
