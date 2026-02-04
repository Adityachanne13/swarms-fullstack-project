import { MapPin, Calendar, Clock } from 'lucide-react';

const ReportCard = ({ report }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100">
      
      {/* Image Section */}
      <div className="h-48 overflow-hidden bg-gray-200 relative">
      <img 
        src={`https://swarms-backend.onrender.com${report.image}`} 
        alt="Waste Report" 
        className="w-full h-48 object-cover"
      />
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
          ${report.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}
        `}>
          {report.status}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <Calendar size={14} />
          <span>{new Date(report.createdAt).toLocaleDateString()}</span>
          <Clock size={14} className="ml-2" />
          <span>{new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        <h3 className="font-bold text-lg text-gray-800 mb-1">{report.type} Waste</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{report.description}</p>

        <div className="flex items-center text-gray-500 text-sm bg-gray-50 p-2 rounded-lg">
          <MapPin size={16} className="text-green-600 mr-2 flex-shrink-0" />
          <span className="truncate">Lat: {report.location.latitude}, Long: {report.location.longitude}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;