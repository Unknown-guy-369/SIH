import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Internship Allocation System</h1>
      <p className="text-lg mb-6">Your gateway to exciting internship opportunities.</p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Login
        </Link>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;