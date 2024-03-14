// CommentsForm.tsx

import React, { useState } from 'react';
import './CommentsForm.css';

const CommentsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      formValid = false;
    } else {
      newErrors.name = '';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      formValid = false;
    } else {
      newErrors.email = '';
    }

    // Comment validation
    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
      formValid = false;
    } else {
      newErrors.comment = '';
    }

    if (formValid) {
      // Submit the form data
      console.log('Form submitted:', formData);
      // Reset form data
      setFormData({ name: '', email: '', comment: '' });
    } else {
      // Update errors
      setErrors(newErrors);
    }
  };

  return (
    <div className="comments-form">
      <h2>Comments Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
          {errors.comment && <span className="error">{errors.comment}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentsForm;
