
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Task Manager</h1>
      <p style={styles.subtitle}>
        Organize your tasks, stay productive, and achieve your goals effortlessly.
      </p>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h3>🗂️ Manage Tasks</h3>
          <p>Create, update, and track all your tasks in one place.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>🔔 Reminders</h3>
          <p>Get notified before deadlines so you never miss a task.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>📊 Progress Tracking</h3>
          <p>Visualize your progress and stay motivated every day.</p>
        </div>
      </div>

      <button style={styles.ctaButton} onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#FFF9F0 ',
    borderRadius: 12,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '3rem',
    color: '#7f8c8d',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '3rem',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  featureCard: {
    flex: '1 1 250px',
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: '1.5rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  },
  ctaButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '1rem 2.5rem',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: 30,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;

