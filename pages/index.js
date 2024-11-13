import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://n8n-automation-plxz.onrender.com/healthz');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Call immediately on load

    const intervalId = setInterval(fetchData, 30000); // Call every 30 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  return (
    <div>
      <h1>Health Check:</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
    </div>
  );
}
