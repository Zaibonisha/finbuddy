import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Optional: redirect after logout
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          FinBuddy
        </Link>
      </div>

      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        <Link to="/about" style={styles.link}>
          About
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={styles.link}>
              Dashboard
            </Link>
            <Link to="/budget" style={styles.link}>
              Budget
            </Link>
            <Link to="/analysis" style={styles.link}>
              Analysis
            </Link>
            <Link to="/goals" style={styles.link}>
              Goals
            </Link>
            <Link to="/learning-hub" style={styles.link}>
              Learning Hub
            </Link>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease-in-out',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: '#fff',
    padding: '0.4rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

// Add hover effects inline (React style) by using event handlers or consider CSS files for better maintainability

export default Navbar;
