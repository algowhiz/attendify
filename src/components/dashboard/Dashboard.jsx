import React from "react";
import { useSelector } from "react-redux";
import { FaChalkboardTeacher, FaClipboardList,  FaUserGraduate } from "react-icons/fa";

// Sample attendance data
const attendanceData = {
  present: 18,
  absent: 2,
  holidays: 5,
};

// Pie chart data configuration
const chartData = {
  labels: ["Present", "Absent", "Holidays"],
  datasets: [
    {
      data: [attendanceData.present, attendanceData.absent, attendanceData.holidays],
      backgroundColor: ["#10B981", "#EF4444", "#FBBF24"],
      hoverBackgroundColor: ["#059669", "#DC2626", "#D97706"],
    },
  ],
};




const Dashboard = () => {


  // const [selectedMonth, setSelectedMonth] = useState("January");
  const user = useSelector((state) => state.user);
  if (!user) {
    return <div className="text-red-500">User data is not available.</div>;
  }
  console.log(user);

  const renderDashboardContent = () => {
    switch (user?.user?.role) {
      case "admin":
        return (
          <>

            {/* Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <div className="flex-shrink-0 bg-purple-500 p-2 rounded-full">
                  <i className="fas fa-dollar-sign text-white"></i>
                </div>
                <div>
                  <h3 className="text-gray-600">Total Revenue</h3>
                  <p className="text-2xl font-bold">$405,091.00</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <div className="flex-shrink-0 bg-blue-500 p-2 rounded-full">
                  <i className="fas fa-chalkboard-teacher text-white"></i>
                </div>
                <div>
                  <h3 className="text-gray-600">Total Classes</h3>
                  <p className="text-2xl font-bold">15</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <div className="flex-shrink-0 bg-green-500 p-2 rounded-full">
                  <i className="fas fa-users text-white"></i>
                </div>
                <div>
                  <h3 className="text-gray-600">Total Teachers</h3>
                  <p className="text-2xl font-bold">20</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <div className="flex-shrink-0 bg-yellow-500 p-2 rounded-full">
                  <i className="fas fa-user-graduate text-white"></i>
                </div>
                <div>
                  <h3 className="text-gray-600">Total Students</h3>
                  <p className="text-2xl font-bold">200</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="bg-white p-4 rounded shadow">
                <p>No recent activity yet.</p>
              </div>
            </div>
          </>
        );
      case "student":
        return (
          <div className="w-full">
            {/* Attendance Chart */}
            <div className="bg-white w-full p-6 rounded shadow mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Attendance Overview</h2>
              <div className="w-72 mx-auto">
                {/* <Pie data={chartData} /> */}
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-700">
                  Present: <span className="font-bold">{attendanceData.present}</span> days
                </p>
                <p className="text-gray-700">
                  Absent: <span className="font-bold">{attendanceData.absent}</span> days
                </p>
                <p className="text-gray-700">
                  Holidays: <span className="font-bold">{attendanceData.holidays}</span> days
                </p>
              </div>
            </div>
          </div>
        );
      case "teacher":
      default:
        return (
          <div>
            <>
              {/* Statistics Cards */}
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-purple-500 p-2 rounded-full">
                    <FaUserGraduate className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-600">Total Students</h3>
                    <p className="text-2xl font-bold"></p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-blue-500 p-2 rounded-full">
                    <FaClipboardList className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-600">Total Present</h3>
                    <p className="text-2xl font-bold"></p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-yellow-500 p-2 rounded-full">
                    <FaChalkboardTeacher className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-600">Total Absent</h3>
                    <p className="text-2xl font-bold"></p>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Attendance Distribution</h3>
                    <div className="chart-container">
                      {/* <Pie data={} /> */}
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Monthly Attendance Trends</h3>
                    <div className="chart-container">
                      {/* <Bar data={} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        );
    }
  };

  return (
    <>
      {renderDashboardContent()}
    </>
  );
};

export default Dashboard;
