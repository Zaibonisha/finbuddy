import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div style={styles.container}>
      <div style={styles.iconWrapper}>
        <div style={styles.cube}>
          <span style={styles.cubeFace}>💵</span>
        </div>
      </div>

      <h1 style={styles.heading}>Welcome to Our Finance App</h1>
      <p style={styles.text}>
        Explore our features by browsing the menu and getting started.
      </p>

      <div style={styles.buttonContainer}>
        <Link to="/resources" style={styles.button}>Resources</Link>
        <Link to="/about" style={{ ...styles.button, ...styles.secondaryButton }}>About</Link>
        <Link to="/getting-started" style={styles.button}>Getting Started</Link>
      </div>

      {/* Cards Section */}
      <div style={styles.cardsWrapper}>
        <Card
          title="Smart Budget Planner"
          description="Create and manage your budgets easily with our intuitive planner."
          image="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80"
          imageLeft={true}
        />
        <Card
          title="Real-time Spending Analysis"
          description="Track your expenses in real-time and get insights on your spending habits."
          image="https://www.welloneapp.com/wp-content/uploads/2019/04/Content-2-Review-Your-Spending.jpeg"
          imageLeft={false}
        />
        <Card
          title="Achieve Your Financial Goals"
          description="Set and track your saving goals to secure your future."
          image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
          imageLeft={true}
        />
      </div>
    </div>
  );
}

function Card({ title, description, image, imageLeft }) {
  return (
    <div
      style={{
        ...styles.card,
        flexDirection: imageLeft ? 'row' : 'row-reverse',
      }}
    >
      <img src={image} alt={title} style={styles.cardImage} />
      <div style={styles.cardContent}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '3rem 1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
    minHeight: '100vh',
    color: '#fff',
  },
  iconWrapper: {
    perspective: '600px',
    marginBottom: '2rem',
  },
  cube: {
    margin: '0 auto',
    width: '80px',
    height: '80px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    animation: 'spin 6s linear infinite',
  },
  cubeFace: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    backgroundColor: '#00c6ff',
    color: '#004e92',
    fontSize: '3rem',
    lineHeight: '80px',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,198,255,0.7)',
    transform: 'translateZ(40px)',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
  },
  text: {
    fontSize: '1.4rem',
    marginBottom: '3rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#cce4ff',
    textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.2rem',
    flexWrap: 'wrap',
    marginBottom: '3rem',
  },
  button: {
    padding: '0.9rem 2.2rem',
    backgroundColor: '#00c6ff',
    color: '#004e92',
    fontWeight: '600',
    fontSize: '1.1rem',
    borderRadius: '30px',
    textDecoration: 'none',
    boxShadow: '0 5px 15px rgba(0,198,255,0.4)',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #00c6ff',
    boxShadow: 'none',
  },

  // Cards styles
  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '1rem 2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    color: '#fff',
  },
  cardImage: {
    width: '160px',
    height: '120px',
    borderRadius: '12px',
    objectFit: 'cover',
    marginRight: '1.5rem',
    flexShrink: 0,
  },
  cardContent: {
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
  },
  cardDescription: {
    fontSize: '1.1rem',
    color: '#d4eaff',
  },
};

// CSS keyframe animation for spinning cube
const styleSheet = `
@keyframes spin {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}
`;

if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styleSheet;
  document.head.appendChild(styleTag);
}

export default Homepage;
