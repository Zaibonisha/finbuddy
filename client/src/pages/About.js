import React from 'react';

export default function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About This App</h1>
      <p style={styles.paragraph}>
        Welcome to our personal finance app! This platform helps you manage your budget,
        track spending, set financial goals, and learn about money management through AI-powered content.
      </p>
      <p style={styles.paragraph}>
        Our mission is to empower you with the tools and knowledge to make smart financial decisions and improve your financial wellbeing.
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '750px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: '2.4rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#2c3e50',
  },
  paragraph: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    marginBottom: '1.2rem',
    color: '#444',
    textAlign: 'justify',
  },
};
