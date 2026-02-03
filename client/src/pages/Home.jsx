import { Link } from 'react-router-dom';
import { Camera, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Keep Your City Clean, Smartly.
          </h1>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            SWaMRS empowers citizens to report waste issues in seconds. 
            Snap a photo, share the location, and track the cleanup in real-time.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Report Waste Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="text-blue-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Snap a Photo</h3>
            <p className="text-gray-600">See garbage? Take a picture and add a quick description.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition border border-gray-100">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-red-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Tag Location</h3>
            <p className="text-gray-600">Your GPS location is automatically sent to nearby workers.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition border border-gray-100">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Problem Solved</h3>
            <p className="text-gray-600">Get notified when the waste is collected and the area is clean.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;