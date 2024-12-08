import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, username, password);

      // Show the success toast
      toast.success('User logged in Successfully', {
        position: "top-center",
        autoClose: 1500,
      });

      // Delay navigation to allow the toast to display
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Wait 2 seconds to ensure the toast is visible
    } catch (error) {
      console.log(error.message);

      // Show the error toast
      toast.error('Invalid username or password!', {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
      }}
    >
      <div className="card shadow-lg" style={{ width: '400px', borderRadius: '15px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4" style={{ color: '#2575fc', fontWeight: 'bold' }}>
            Admin Login
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                <i className="bi bi-person-fill me-2"></i>Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                <i className="bi bi-lock-fill me-2"></i>Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ backgroundColor: '#2575fc', border: 'none' }}
            >
              Login
            </button>
          </form>
        </div>
        <div
          className="text-center p-3"
          style={{
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #ddd',
            borderRadius: '0 0 15px 15px',
          }}
        >
          <small className="text-muted">© 2024 Cafe Neone</small>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default Login;
