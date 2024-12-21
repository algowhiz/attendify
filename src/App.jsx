import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm'; // Make sure this path is correct
import SignUp from './components/auth/SignUp'; // Make sure this path is correct
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CreateCourse from './components/admin/CreateCourse';
import Hero from './components/LandingPages/Hero';
import About from './components/LandingPages/About';
import Header from './components/Utils/Header'
import Footer from './components/Utils/Footer'
import StudentDashboard from './components/dashboard/StudentDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import Attendance from './components/teacher/Attendance';
import SendNotice from './components/teacher/SendNotice';
import ViewNotice from './components/student/ViewNotice';
import CourseDetails from './components/admin/CourseDetails';

const HomePage = () => (
  <>
    <Hero />
    <About />
  </>
);

const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes where Header and Footer should not be displayed
  const hideHeaderFooter = ['/admin', '/teacher', '/student'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div className={`flex flex-col ${!hideHeaderFooter ? 'mt-[83px]' : ''} justify-center items-center min-h-screen`}>
        {children}
      </div>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="send-notices" element={<SendNotice />} />
          </Route>
          <Route path="/student" element={<StudentDashboard />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="view-notice" element={<ViewNotice />} />
          </Route>
          <Route path="/teacher" element={<TeacherDashboard />}>
            <Route path="dashboard" element={<Dashboard />}  />
            <Route path="attendance" element={<Attendance />} />
            <Route path="send-notices" element={<SendNotice />} />
          </Route>
          <Route path="/courses/:courseId" element={<CourseDetails/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;