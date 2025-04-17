import { useEffect, useState } from 'react';
import axios from 'axios';

const Footer = () => {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/footer')
      .then((res) => {
        setFooterData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching footer data:", err);
      });
  }, []);

  return (
    <footer className="bg-gray-900 text-white p-4 text-center">
      {footerData.length > 0 ? (
        footerData.map((item) => (
          <p key={item.id}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="underline">
              {item.text}
            </a>
          </p>
        ))
      ) : (
        <p>Loading footer...</p>
      )}
    </footer>
  );
};

export default Footer;
