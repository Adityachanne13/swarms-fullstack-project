import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // This connects to your backend
import toast from 'react-hot-toast'; // For the cool popup alerts
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  
  // 1. State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submit (The important part!)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page refresh
    
    try {
      // Send data to backend
      const res = await api.post('/auth/register', formData);
      
      // Success!
      toast.success('Registration Successful!');
      
      // Save user data (Token) to LocalStorage
      localStorage.setItem('user', JSON.stringify(res.data));
      
      // Redirect to Dashboard
      navigate('/dashboard');
      
      // Force page reload to update Navbar state
      window.location.reload(); 
      
    } catch (error) {
      // Error Handling
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Join SWaMRS</h2>
          <p className="text-gray-500 mt-2">Create an account to report waste</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="********"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <UserPlus size={20} /> Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;