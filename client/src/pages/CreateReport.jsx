import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { UploadCloud, MapPin, Loader, Send } from 'lucide-react';

const CreateReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [type, setType] = useState('Plastic');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // Location State
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    address: 'Fetching location...',
  });

  // 1. Function to Get User's GPS Location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`
          });
          toast.success('Location Fetched!');
        },
        (error) => {
          console.error(error);
          toast.error('Could not fetch location. Please enable GPS.');
          setLocation({ ...location, address: 'Location access denied' });
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  // 2. Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // 3. Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !location.latitude) {
      return toast.error('Please provide an image and allow location access.');
    }

    const formData = new FormData();
    formData.append('type', type);
    formData.append('description', description);
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);
    formData.append('image', image);

    try {
      setLoading(true);
      // We don't need to manually set headers; Axios handles FormData automatically
      await api.post('/reports', formData);
      
      toast.success('Report Submitted Successfully!');
      navigate('/dashboard'); // Go back to dashboard to see the new report
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="bg-green-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Report New Waste</h2>
          <p className="text-green-100 text-sm">Help us keep the city clean</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Waste Type */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Waste Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="Plastic">Plastic Waste</option>
              <option value="Organic">Organic / Food Waste</option>
              <option value="Electronic">Electronic Waste (E-Waste)</option>
              <option value="Construction">Construction Debris</option>
              <option value="Hazardous">Hazardous / Medical</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Describe the waste (e.g., pile of bottles near the park bench)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>

          {/* Location Section */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="bg-green-100 p-2 rounded-full">
                <MapPin className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{location.address}</p>
                {!location.latitude && (
                  <p className="text-xs text-red-500">Location required</p>
                )}
              </div>
              <button
                type="button"
                onClick={getLocation}
                className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition"
              >
                Get GPS
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Photo Proof</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              
              {preview ? (
                <div className="relative h-48 w-full">
                   <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                   <p className="mt-2 text-xs text-green-600 font-bold">Click to change photo</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <UploadCloud size={48} className="mb-2" />
                  <span className="font-medium">Click to Upload Image</span>
                  <span className="text-xs text-gray-400">JPG, PNG, JPEG</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader className="animate-spin" /> : <Send size={20} />}
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateReport;