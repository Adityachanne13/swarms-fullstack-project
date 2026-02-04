import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast'; // Import toast at the top if missing
import { LayoutDashboard, CheckCircle, Clock, Map } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
  
  // 1. Fetch ALL reports (Admin Power)
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/reports'); // This endpoint returns ALL reports
        setReports(res.data);
        
        // Calculate Stats
        const total = res.data.length;
        const pending = res.data.filter(r => r.status === 'Pending').length;
        const resolved = res.data.filter(r => r.status === 'Resolved').length;
        setStats({ total, pending, resolved });
        
      } catch (error) {
        console.error("Access Denied", error);
        // If not admin, kick them out
        navigate('/dashboard'); 
      }
    };

    fetchReports();
  }, [navigate]);

  // 2. Function to Update Status (Mark as Collected)
  // We will implement the backend for this in the next step, 
  // but let's prepare the button now.
  const handleStatusUpdate = async (id) => {
  if (window.confirm("Are you sure this waste has been collected?")) {
    try {
      await api.put(`/reports/${id}/status`, { status: "Resolved" });
      
      toast.success("Report marked as Resolved!");
      
      // Update the UI immediately without refreshing
      setReports(reports.map(report => 
        report._id === id ? { ...report, status: "Resolved" } : report
      ));
      
      // Update stats locally
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        resolved: prev.resolved + 1
      }));
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <LayoutDashboard className="text-purple-600" /> Admin Control Center
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <p className="text-gray-500">Total Reports</p>
            <h2 className="text-4xl font-bold">{stats.total}</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <p className="text-gray-500">Pending Issues</p>
            <h2 className="text-4xl font-bold text-yellow-600">{stats.pending}</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <p className="text-gray-500">Resolved / Cleaned</p>
            <h2 className="text-4xl font-bold text-green-600">{stats.resolved}</h2>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-700">Recent Waste Reports</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-100 uppercase font-medium text-gray-500">
                <tr>
                  <th className="px-6 py-3">Reporter</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Photo</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {report.userId?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4">{report.type}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{report.location.address || "GPS Coordinates"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        report.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`https://swarms-backend.onrender.com${report.image}`} target="_blank">View</a>
                    </td>
                    <td className="px-6 py-4">
                      {report.status === 'Pending' && (
                        <button 
                          onClick={() => handleStatusUpdate(report._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
                        >
                          Mark Done
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;