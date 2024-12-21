import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaUserPlus, FaUserGraduate } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const CourseDetails = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [email, setEmail] = useState('');
    const [loadingModal, setLoadingModal] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://attendify-backend-qe4c.onrender.com/api/courses/${courseId}`);
                setCourse(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleAddTeacher = async () => {
        setLoadingModal(true);
        try {
            await axios.post(`https://attendify-backend-qe4c.onrender.com/api/courses/${courseId}/add-teacher`, { email });
            toast.success('Teacher added successfully');
            setShowModal(false);
            fetchUserDetails();
        } catch (error) {
            console.log(error);
            
            handleError(error);
        } finally {
            setLoadingModal(false);
        }
    };

    const handleAddStudent = async () => {
        setLoadingModal(true);
        try {
            await axios.post(`https://attendify-backend-qe4c.onrender.com/api/courses/${courseId}/add-student`, { email });
            toast.success('Student added successfully');
            setShowModal(false);
            fetchUserDetails();
        } catch (error) {
            handleError(error);
        } finally {
            setLoadingModal(false);
        }
    };

    const fetchUserDetails = async () => {
        try {
            const ids = [...course.teachers.map(t => t.id), ...course.students.map(s => s.id)];
            const response = await axios.post(`https://attendify-backend-qe4c.onrender.com/api/courses/getInfoOfUsers`, { ids });
            if (response.data) {
                console.log(response.data);
            } else {
                throw new Error('No user details found');
            }
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    const handleError = (error) => {
        if (error.response && error.response.data) {
            toast.error(` ${error.response.data.message}`);
        } else {
            toast.error(`Error adding teacher: ${error.message}`);
        }
    };

    const openModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEmail('');
    };

    if (loading) {
        return (
            <div className="spinner">
                Loading...
            </div>
        );
    }

    if (error) {
        return <div>Error fetching course: {error}</div>;
    }

    return (
        <div className="p-4 w-[90vw]">
            <h2 className="text-3xl font-bold mb-6 text-center">Course Details</h2>
            <div className="flex flex-col gap-6">
                <div className="course-card bg-white p-6 rounded-lg shadow-md flex-grow">
                    <h3 className="text-2xl font-semibold mb-4">{course.name}</h3>
                    <p className="text-lg mb-2">Teacher: {course.teachers.length || 'No teachers assigned'}</p>
                    <p className="text-lg mb-2">Students: {course.students.length}</p>
                    <Link to="#" onClick={() => openModal('teacher')} className="text-green-600 hover:underline flex items-center gap-2">
                        <FaUserPlus /> Add Teacher
                    </Link>
                    <Link to="#" onClick={() => openModal('student')} className="text-green-600 hover:underline flex items-center gap-2 mt-2">
                        <FaUserGraduate /> Add Student
                    </Link>
                </div>
                {/* Testiong mode code  */}
                {/* <div className='flex gap-6'>
                    <div className="teacher-list w-1/2 bg-white p-6 rounded-lg shadow-md flex-grow">
                        <h4 className="text-xl font-semibold mb-4">Teachers</h4>
                        <ul className="space-y-2">
                            {course.teachers.map(teacher => (
                                <li key={teacher.id} className="border-b pb-2 mb-2">
                                    <p>Name: {teacher.name}</p>
                                    <p>Email: {teacher.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="student-list w-1/2 bg-white p-6 rounded-lg shadow-md flex-grow">
                        <h4 className="text-xl font-semibold mb-4">Students</h4>
                        <ul className="space-y-2">
                            {course.students.map(student => (
                                <li key={student.id} className="border-b pb-2 mb-2">
                                    <p>Name: {student.name}</p>
                                    <p>Email: {student.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div> */}
            </div>
            {showModal && (
                <div className="fixed w-full h-screen top-0 left-0 flex items-center justify-center inset-20 bg-black bg-opacity-70 z-50">
                    <div className="bg-white p-6 rounded-lg w-[300px] relative">
                        <h3 className="text-xl font-semibold mb-4">{modalType === 'teacher' ? 'Add Teacher' : 'Add Student'}</h3>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="border p-2 w-full mb-4 rounded"
                        />
                        <div className='flex gap-3'>
                            <button onClick={modalType === 'teacher' ? handleAddTeacher : handleAddStudent} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full mb-2">
                                Add
                            </button>
                            <button onClick={closeModal} className="bg-gray-600 mb-2 text-white px-4 py-2 rounded hover:bg-gray-700 w-full">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default CourseDetails;
