import React from 'react';

const CreateClassModal = ({ createCourse, setIsModalOpen, setCourseName, courseName, isLoading }) => {
  return (
    <div className="absolute top-0 left-0 inset-20 bg-black bg-opacity-70 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[250px] transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg flex justify-center items-center max-w-xs">
        <div>
          <h3 className="text-xl w-full font-semibold mb-4 text-gray-800">Create Class / Course</h3>
          <input
            type="text"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring focus:ring-purple-300"
          />
          <div className="flex justify-around gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:ring focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => createCourse(courseName)}
              className={`px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:ring focus:ring-purple-300 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClassModal;
