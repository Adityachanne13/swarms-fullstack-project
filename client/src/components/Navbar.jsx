import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  // Check if user is logged in (we will improve this with Context later)
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">SWaMRS</span>
            </Link>
          </div>

          {/* Buttons Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-green-600 font-medium">
                  Dashboard
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-500 hidden md:block">
                    Hi, {user.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;