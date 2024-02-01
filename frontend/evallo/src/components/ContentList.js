import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ListContainer = styled.div`
  max-width: 600px;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const ListItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 16px;
  color: #555;
`;

const ContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content');
        setContentList(response.data.content);
      } catch (error) {
        console.error('Error retrieving content:', error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <ListContainer>
      <h2>Submitted Content</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {contentList.map((content) => (
            <ListItem key={content._id}>
              <div>
                <Title>{content.title}</Title>
                <Description>{content.description}</Description>
              </div>
              <a href={content.mockFileLink} target="_blank" rel="noopener noreferrer">
                View Mock File
              </a>
            </ListItem>
          ))}
        </div>
      )}
    </ListContainer>
  );
};

export default ContentList;