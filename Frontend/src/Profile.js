import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const testEmail = 'riyaupadhyay.2201@gmail.com'; // replace with real, verified email

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('🔍 Fetching profile for:', testEmail);

        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { email: testEmail },
        });

        console.log('✅ Response from backend:', res.data);

        setProfile(res.data.user);
        setFormData({ name: res.data.user.name, email: res.data.user.email });
      } catch (err) {
        console.error('❌ Error fetching profile:', err.response?.data || err.message);
        setMessage('Error loading profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log('📤 Updating profile with:', formData);

      const res = await axios.put('http://localhost:5000/api/profile', formData, {
        headers: { email: testEmail },
      });

      console.log('✅ Update response:', res.data);

      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('❌ Update failed:', err.response?.data || err.message);
      setMessage('Update failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Profile</h2>

      {/* ✅ Show current profile info */}
      {profile && (
        <div style={styles.infoBox}>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      )}

      <form onSubmit={handleUpdate} style={styles.form}>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Update Profile
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    boxShadow: '0 0 6px rgba(0,0,0,0.05)',
    color: '#444',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#444',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#4CAF50',
  },
};

export default Profile;

