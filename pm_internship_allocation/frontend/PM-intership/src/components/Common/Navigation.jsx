import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Assuming there's a custom hook for authentication

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-bold">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/industry-portal" className="hover:underline">Industry Portal</Link>
              <Link to="/applicant-portal" className="hover:underline">Applicant Portal</Link>
              <Link to="/government-portal" className="hover:underline">Government Portal</Link>
            </>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;