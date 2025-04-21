import React, { useState } from 'react';
import { registerFields } from './formFields';

export const registerFields = [
    { label: 'Username', name: 'username', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Password', name: 'password', type: 'password', required: true },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password', required: true },
];

const RegisterForm = () => {
  const [formData, setFormData] = useState(
    registerFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    registerFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Dynamic Register Form</h2>
      {submitted && <p style={{ color: 'green' }}>Registration successful!</p>}

      <form onSubmit={handleSubmit}>
        {registerFields.map((field) => (
          <div key={field.name} style={{ marginBottom: '12px' }}>
            <label>{field.label}:</label><br />
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {errors[field.name] && (
              <div style={{ color: 'red' }}>{errors[field.name]}</div>
            )}
          </div>
        ))}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
