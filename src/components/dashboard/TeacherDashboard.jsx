import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaTachometerAlt,
  FaClipboardList,
} from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { clearUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Sidebar from "../Utils/Sidebar";

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login"); // Redirect
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: <FaTachometerAlt />, href: "dashboard" },
    { name: "Take Attendance", icon: <FaClipboardList />, href: "attendance" },
    { name: "Send Notices", icon: <FaChalkboardTeacher />, href: "send-notices" },
    { name: "Logout", icon: <CiLogin />, onClick: handleLogout },
  ];

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <Sidebar
        title="Teacher Panel"
        links={sidebarLinks}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 w-auto md:w-[70vw] sm:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="flex justify-around w-full items-center mb-6">
          <button
            className="sm:hidden text-gray-800 mr-3 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars size={24} />
          </button>

          <div className="flex justify-between w-full items-center gap-3 md:gap-6">
            <h1 className="text-xl md:text-3xl font-bold whitespace-nowrap text-gray-800">
              Teacher Dashboard
            </h1>
          </div>
        </header>

        {/* Outlet for rendering child components */}
        <Outlet context={{ isSidebarOpen, setIsSidebarOpen, selectedMonth }} />
      </div>
    </div>
  );
};

export default TeacherDashboard;
