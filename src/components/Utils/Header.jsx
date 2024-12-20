import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/slices/userSlice';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const getDashboardLink = () => {
    if (user?.user?.role === 'admin') return '/admin/dashboard';
    if (user?.user?.role === 'teacher') return '/teacher/dashboard';
    if (user?.user?.role === 'student') return '/student/dashboard';
    return '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Attendify</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {user?.user && (
              <Link
                to={getDashboardLink()}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            )}
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="#about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="#features" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="#contact" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user?.user === null ? (
              <>
                <Link to="/login">
                  <button className="btn-outline">Log in</button>
                </Link>
                <Link to="/signup">
                  <button className="btn">Sign up</button>
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
