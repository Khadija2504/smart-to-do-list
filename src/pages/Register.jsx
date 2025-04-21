import React, { useState } from 'react';

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

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Simulated response (you would get this from your backend API)
      const fakeResponse = {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      };

      // Save JWT and user to localStorage
      localStorage.setItem('user', JSON.stringify(fakeResponse.user));

    //   console.log('user saved to localStorage.');
      console.log('Form Submitted:', formData);

      setSubmitted(true);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      {submitted && <p style={{ color: 'green' }}>Registration Successful!</p>}

      <form onSubmit={handleSubmit}>
        {registerFields.map(({ label, name, type }) => (
          <div key={name} style={{ marginBottom: '10px' }}>
            <label>{label}:</label><br />
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
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
