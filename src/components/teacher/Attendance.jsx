import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://attendify-backend-qe4c.onrender.com/api/courses/teacher?teacherId=${user.id}`
        );
        const classesData = response.data || [];
        setClasses(classesData);
  
        // Check if there are classes available
        if (classesData.length > 0) {
          setSelectedClass(classesData[0]); // Set the first class as the default selected class
          setStudents(classesData[0].students || []); // Set students for the selected class
        } else {
          setError("No classes available.");
        }
      } catch (error) {
        setError("Failed to fetch classes.");
      } finally {
        setLoading(false);
      }
    };
  
    if (user?.role === "teacher") {
      fetchClasses();
    } else {
      setError("You are not authorized to view classes.");
    }
  }, [user]);
  

  const toggleAttendance = (studentId, date) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [date]: !prev[studentId]?.[date],
      },
    }));
  };

  const getDatesInCurrentMonth = () => {
    const today = new Date();
    const todayDate = today.toISOString().slice(0, 10);
    return [todayDate];
  };

  const handleClassChange = (classId) => {
    const selected = classes.find((cls) => cls._id === classId);
    setSelectedClass(selected);
    setStudents(selected?.students || []);
  };

  const handleSave = async () => {
    try {
      console.log(attendance);
      
      const response = await axios.post("https://attendify-backend-qe4c.onrender.com/api/courses/save-attendence", {
        courseId: selectedClass._id, // Replace with the actual course ID
        year: new Date().getFullYear(),
        month: new Date().toLocaleString("default", { month: "long" }),
        attendanceData: attendance,
        teacherId: user.id,
      });

      if (response.status === 200) {
        toast.success("Attendance saved successfully!");
      } else {
        throw new Error("Failed to save attendance");
      }
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to save attendance. Please try again later.");
      console.error("Error saving attendance:", error);
    }
  };

  const dates = getDatesInCurrentMonth();

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Attendance Management
      </h1>

      {/* Classes Section */}
      {loading ? (
        <p className="text-center text-gray-600">Loading classes...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : classes.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Your Class
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {classes.map((cls) => (
              <div
                key={cls._id}
                className={`w-60 bg-white rounded-lg shadow-md p-4 text-center border ${
                  selectedClass?._id === cls._id ? "border-blue-500" : "border-gray-200"
                }`}
                onClick={() => handleClassChange(cls._id)}
              >
                <h3 className="text-lg font-medium text-gray-800">{cls.name}</h3>
                <p className="text-sm text-gray-500">Students: {cls.students.length}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No classes assigned to you.</p>
      )}

      {/* Attendance Table */}
      {selectedClass && students.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Attendance for Class {selectedClass.name}
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Student Name</th>
                  {dates.map((date) => (
                    <th key={date} className="px-4 py-2 border border-gray-300 text-xs lg:text-sm">
                      {new Date(date).getDate()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="text-center">
                    <td className="px-4 py-2 border border-gray-300 text-gray-700">
                      {student.username}
                    </td>
                    {dates.map((date) => (
                      <td key={date} className="px-4 py-2 border border-gray-300">
                        <input
                          type="checkbox"
                          checked={attendance[student._id]?.[date] || false}
                          onChange={() => toggleAttendance(student._id, date)}
                          className="cursor-pointer"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600"
            >
              Save Attendance
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Attendance;
