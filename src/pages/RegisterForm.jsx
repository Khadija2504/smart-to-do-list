import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const registerFields = [
  { label: 'Username', name: 'username', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Password', name: 'password', type: 'password', required: true },
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password', required: true },
];

const RegisterForm = () => {
  const [formData, setFormData] = useState(
    registerFields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );

  const { registerUser } = useAuth();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    registerFields.forEach(({ name, label, required }) => {
      if (required && !formData[name]) {
        newErrors[name] = `${label} is required`;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      const fakeApiResponse = {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
      };

      registerUser(fakeApiResponse.user);
      setSubmitted(true);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: error.message || 'Registration failed' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      {submitted && <p style={{ color: 'green' }}>Registration Successful!</p>}
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}

      <form onSubmit={handleSubmit}>
        {registerFields.map(({ label, name, type }) => (
          <div key={name} style={{ marginBottom: '10px' }}>
            <label>{label}:</label><br />
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
            {errors[name] && <div style={{ color: 'red' }}>{errors[name]}</div>}
          </div>
        ))}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
