import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import axios from 'axios';

export default function RadarMap() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchRadar = async () => {
      const res = await axios.get('https://188.137.240.130/api/rala?min_lat=51&max_lat=54&min_lon=235&max_lon=238'); // Update with your backend URL
      setPoints(res.data);
    };
    fetchRadar();
    const interval = setInterval(fetchRadar, 120000); // refresh every 2 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[60, -150]} zoom={4} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((pt, i) => (
        <CircleMarker
          key={i}
          center={[pt.lat, pt.lon]}
          radius={2}
          pathOptions={{ color: getColor(pt.dBZ), fillOpacity: 0.6 }}
        />
      ))}
    </MapContainer>
  );
}

function getColor(dBZ) {
  if (dBZ > 60) return '#800026';
  if (dBZ > 50) return '#BD0026';
  if (dBZ > 40) return '#E31A1C';
  if (dBZ > 30) return '#FC4E2A';
  if (dBZ > 20) return '#FD8D3C';
  if (dBZ > 10) return '#FEB24C';
  if (dBZ < 10) return '#FEB24C';
  
  return '#FFEDA0';
}
