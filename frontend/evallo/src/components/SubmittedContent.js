import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubmittedContent = () => {
  const [content, setContent] = useState([]);
  const [Loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content');
        setContent(response.data.content);
      } catch (error) {
        console.error('Error retrieving content:', error.response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Submitted Content</h2>
      <ul>
        {content.map((item) => (
          <li key={item._id}>
            <strong>Title:</strong> {item.title} <strong>Description:</strong> {item.description} <strong>MockFileLink:</strong> {item.mockFileLink}
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedContent;