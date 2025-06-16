import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

function EditAccount() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch user info on mount
  useEffect(() => {
    fetch('http://148.113.201.173:3000/api/user/me')
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
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
    fetch('http://148.113.201.173:3000/api/user/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        setMessage('Account updated successfully!');
        setSaving(false);
      })
      .catch(() => {
        setMessage('Failed to update account.');
        setSaving(false);
      });
  };

  return (
    <Layout>
      <div style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 8 }}>
        <h2>Edit Account Information</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
                required
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
                required
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <button type="submit" disabled={saving} style={{ padding: '8px 24px' }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            {message && <p style={{ marginTop: 16 }}>{message}</p>}
          </form>
        )}
      </div>
    </Layout>
  );
}

export default EditAccount;