import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ReportCard from '../components/ReportCard';
import { PlusCircle, Loader } from 'lucide-react';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch Reports when page loads
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/reports/my-reports');
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
            <p className="text-gray-500">Welcome back, <span className="font-semibold text-green-600">{user?.name}</span></p>
          </div>
          <Link 
            to="/create-report" 
            className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <PlusCircle size={20} /> Report New Waste
          </Link>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-green-600 h-10 w-10" />
          </div>
        ) : reports.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <PlusCircle className="text-gray-400 h-8 w-8" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">No reports yet</h3>
            <p className="mt-2 text-gray-500 max-w-sm mx-auto">You haven't reported any waste issues yet. Help keep your city clean by adding one!</p>
          </div>
        ) : (
          // List of Reports
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;