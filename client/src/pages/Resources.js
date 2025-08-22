import React from 'react';

function Resources() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Resources</h1>
      <p style={styles.text}>
        Here you'll find helpful materials, guides, and tools to improve your financial knowledge.
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <a href="https://www.investopedia.com" target="_blank" rel="noopener noreferrer" style={styles.link}>
            Investopedia
          </a> – Finance tutorials and articles
        </li>
        <li style={styles.listItem}>
          <a href="https://www.khanacademy.org/economics-finance-domain" target="_blank" rel="noopener noreferrer" style={styles.link}>
            Khan Academy Finance
          </a> – Free online courses
        </li>
        <li style={styles.listItem}>
          <a href="https://www.consumerfinance.gov/consumer-tools/" target="_blank" rel="noopener noreferrer" style={styles.link}>
            Consumer Financial Protection Bureau
          </a> – Practical advice and tools
        </li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '750px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1.2rem',
    textAlign: 'center',
    color: '#2c3e50',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#555',
  },
  list: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#444',
    paddingLeft: '1.5rem',
  },
  listItem: {
    marginBottom: '1rem',
  },
  link: {
    color: '#0077cc',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Resources;
