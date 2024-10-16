import {useState, useEffect} from 'react';
import { MapPin } from 'lucide-react';
import { fetchPins } from '../api';

const Pins= () => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    async function displayData(params) {
      try {
        const fetchedPins = await fetchPins();
        setPins(fetchedPins.data);
        // console.log(pins)
      } catch (err) {
        console.error("Error fetching pins", err);
      }
    }
    displayData();
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Pins</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pins.map((pin) => (
          <div key={pin.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <MapPin className="h-6 w-6" style={{ color: pin.color}} />
                <h3 className="ml-2 text-lg font-medium text-gray-900">{pin.description}</h3>
                
              </div>
              <p className="mt-2 text-sm text-gray-800"> Latitude: {pin.location.coordinates[0]}</p>
              <p className="mt-2 text-sm text-gray-800"> Longitude: {pin.location.coordinates[1]}</p>
              <h4 className='mt-2 text-sm text-gray-800'>Difficulty: {pin.difficulty}</h4>
              <p className="mt-2 text-sm text-gray-800"> Time Added: {pin.updatedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pins;