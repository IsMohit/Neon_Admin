import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  // Username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // Success or error
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      console.log("User logged in Successfully");
      setToastMessage('User logged in Successfully');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500); 
    } catch (error) {
      console.log(error.message);
      setToastMessage('Invalid username or password!');
      setToastType('error');
      setShowToast(true);
    }

    // if (username === adminCredentials.username && password === adminCredentials.password) {
    //   setToastMessage('Login successful!');
    //   setToastType('success');
    //   setShowToast(true);
    //   setTimeout(() => {
    //     navigate('/dashboard');
    //   }, 1500); 
    // } else {
    //   setToastMessage('Invalid username or password!');
    //   setToastType('error');
    //   setShowToast(true);
    // }
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
          <small className="text-muted">© 2024 Neon Cafe</small>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`toast position-fixed top-0 start-50 translate-middle-x mt-3`}
          style={{
            zIndex: 1050,
            display: 'block',
            backgroundColor: toastType === 'success' ? '#28a745' : '#dc3545',
            color: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            className="toast-header"
            style={{
              backgroundColor: toastType === 'success' ? '#218838' : '#c82333',
              color: '#fff',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          >
            <strong className="me-auto">{toastType === 'success' ? 'Success' : 'Error'}</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body" style={{ fontSize: '1rem', fontWeight: '500' }}>
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
