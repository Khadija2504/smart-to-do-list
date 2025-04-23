import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext'; // ✅ import this

const App = () => {
  return (
    <AuthProvider> {/* ✅ wrap everything inside AuthProvider */}
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
