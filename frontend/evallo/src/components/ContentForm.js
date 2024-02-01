import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ isValid }) => (isValid ? '#ccc' : 'red')};
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ isValid }) => (isValid ? '#ccc' : 'red')};
  border-radius: 4px;
  box-sizing: border-box;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;

const ContentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mockFileLink, setMockFileLink] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const validationErrors = {};

    if (!title.trim()) {
      validationErrors.title = 'Title is required';
    }

    if (!description.trim()) {
      validationErrors.description = 'Description is required';
    }

    if (!mockFileLink.trim()) {
      validationErrors.mockFileLink = 'Mock File Link is required';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/content', {
        title,
        description,
        mockFileLink,
      });
      console.log('Content submitted successfully:', response.data);

      // Reset form fields and errors on successful submission
      setTitle('');
      setDescription('');
      setMockFileLink('');
      setErrors({});
      setFormSubmitted(true);

      // Simulate a delay for user feedback
      setTimeout(() => {
        setFormSubmitted(false);
      }, 7000);
    } catch (error) {
      console.error('Error submitting content:', error.response.data);
      // Display server validation errors, if any
      if (error.response.data && error.response.data.error) {
        setErrors({ server: error.response.data.error });
      } else {
        setErrors({ server: 'Error submitting content. Please try again.' });
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title:</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isValid={!errors.title}
        />
        {errors.title && <ErrorText>{errors.title}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Description:</Label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isValid={!errors.description}
        />
        {errors.description && <ErrorText>{errors.description}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Mock File Link:</Label>
        <Input
          type="text"
          value={mockFileLink}
          onChange={(e) => setMockFileLink(e.target.value)}
          isValid={!errors.mockFileLink}
        />
        {errors.mockFileLink && <ErrorText>{errors.mockFileLink}</ErrorText>}
      </FormGroup>

      {errors.server && <ErrorText>{errors.server}</ErrorText>}

      {formSubmitted && (
        <p style={{ color: 'green', marginTop: '10px' }}>Form submitted successfully!</p>
      )}

      <SubmitButton type="submit">Submit</SubmitButton>
    </FormContainer>
  );
};

export default ContentForm;
