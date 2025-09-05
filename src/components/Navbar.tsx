import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Home, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <PenTool className="h-6 w-6" />
            <span>BlogSpace</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-blue-50"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/create"
                  className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <PenTool className="h-4 w-4" />
                  <span>Write</span>
                </Link>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-gray-700">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{profile?.full_name || user.email}</span>
                  </div>
                  
                  <button
                    onClick={signOut}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors px-3 py-2 rounded-md hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}