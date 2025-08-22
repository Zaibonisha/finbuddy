import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import BudgetPlanner from './pages/BudgetPlanner';
import SpendingAnalysis from './pages/SpendingAnalysis';
import Goals from './pages/Goals';
import LearningHub from './pages/LearningHub';
import About from './pages/About';
import Resources from './pages/Resources';          // <-- Import Resources page
import GettingStarted from './pages/GettingStarted'; // <-- Import GettingStarted page

import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />           {/* Resources page */}
          <Route path="/getting-started" element={<GettingStarted />} /> {/* Getting Started page */}

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/budget"
            element={
              <PrivateRoute>
                <BudgetPlanner />
              </PrivateRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <PrivateRoute>
                <SpendingAnalysis />
              </PrivateRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <PrivateRoute>
                <Goals />
              </PrivateRoute>
            }
          />
          <Route
            path="/learning-hub"
            element={
              <PrivateRoute>
                <LearningHub />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
