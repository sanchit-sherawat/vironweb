import  { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {API_BASE_URL} from './config';

function EditAccount() {
  const [form, setForm] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          username: data.user_name || '',
          fname: data.first_name || '',
          lname: data.last_name || '',
          email: data.email || '',
          phone: data.phone_number || '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const token = localStorage.getItem('token');
    fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        setMessage('✅ Account updated successfully!');
        setSaving(false);
      })
      .catch(() => {
        setMessage('❌ Failed to update account.');
        setSaving(false);
      });
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Account</h2>
        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                style={styles.input}
                required
                disabled
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="fname"
                value={form.fname}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lname"
                value={form.lname}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                required
                disabled
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <button type="submit" disabled={saving} style={styles.button}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {message && <p style={styles.message}>{message}</p>}
          </form>
        )}
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2c3e50',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    marginBottom: '0.5rem',
    display: 'block',
    fontWeight: '500',
    color: '#34495e',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.3s ease',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4fa3f7',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#2ecc71',
  },
};

export default EditAccount;
