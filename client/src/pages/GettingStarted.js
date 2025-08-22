import React from 'react';

function GettingStarted() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Getting Started</h1>
      <p style={styles.text}>
        Welcome! Here’s a quick guide to help you get the most out of our Finance App:
      </p>
      <ol style={styles.list}>
        <li>Create an account or login if you already have one.</li>
        <li>Use the Smart Budget Planner to set up your monthly budgets.</li>
        <li>Track your expenses with Real-time Spending Analysis.</li>
        <li>Set your financial goals and monitor your progress regularly.</li>
        <li>Explore our Resources page for helpful guides and tips.</li>
      </ol>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '3rem auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '2rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '2.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#2c3e50',
  },
  text: {
    fontSize: '1.3rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#444',
  },
  list: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#555',
    listStyleType: 'decimal',
    paddingLeft: '1.5rem',
  },
};

export default GettingStarted;
