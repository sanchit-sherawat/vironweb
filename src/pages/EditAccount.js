import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { API_BASE_URL } from './config';

function EditAccount() {
  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    province: '',
    zip: '',
    dob: '',
    homeStatus: '',
    employmentStatus: '',
    householdIncome: '',
    socialMedia:'',
    petStatus: '',
    fedback: '',
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
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phoneNumber: data.phone_number || '',
          country: data.country || '',
          state: data.state || '',
          city: data.city || '',
          province: data.province || '',
          zip: data.zip || '',
          dob: data.dob ? new Date(data.dob).toISOString().slice(0, 10) : '',
          homeStatus: data.homestatus || '',
          employmentStatus: data.employmentstatus || '',
          householdIncome: data.householdincome || '',
          petStatus: data.petstatus || '',
          fedback: data.feedback || '',
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
    console.log('Submitting form:',);
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
        <h2 style={styles.heading}>Edit Your Account Information</h2>
        {loading ? (
          <p style={styles.loading}>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.col}>
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
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
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
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.col}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Province</label>
                  <input
                    type="text"
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                
              </div>
              
            </div>
            <div>
              <p><strong>VIRON.NETWORK is a secured website and we value your privacy.</strong></p>
              <p>The requested data below is optional.</p>
              <p>Your information is protected and will not be shared to outside third parties or anyone not associated with VIRON.NETWORK. The information collected is primarily used for &ldquo;KYC&rdquo; purposes and/or used to better serve your needs as a VIRON Member.</p>
              <p>For example, your DOB is collected because we need to ensure you are at least age 18 to own and engage with VIRON. For individuals under 18, we will require the parents&rsquo; or legal guardians&rsquo; consent.</p>
            </div>
            <div style={styles.formGroup}>
                 <div style={styles.formGroup}>
                  <label style={styles.label}>Your Date of Birth (DOB)</label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              <label style={styles.label}>Are you renting or do you own your own home?</label>
              <div>
                <label style={{ marginRight: 16 }}>
                  <input
                    type="radio"
                    name="homeStatus"
                    value="Renting"
                    checked={form.homeStatus === "Renting"}
                    onChange={handleChange}
                    style={{ marginRight: 6 }}
                  />
                  Renting
                </label>
                <label>
                  <input
                    type="radio"
                    name="homeStatus"
                    value="Own Home"
                    checked={form.homeStatus === "Own Home"}
                    onChange={handleChange}
                    style={{ marginRight: 6 }}
                  />
                  Own Home
                </label>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Are you employed, self-employed, or are you retired?</label>
              <div>
                <label style={{ marginRight: 16 }}>
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="Employed"
                    checked={form.employmentStatus === "Employed"}
                    onChange={handleChange}
                    style={{ marginRight: 6 }}
                  />
                  Employed
                </label>
                <label style={{ marginRight: 16 }}>
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="Self-Employed"
                    checked={form.employmentStatus === "Self-Employed"}
                    onChange={handleChange}
                    style={{ marginRight: 6 }}
                  />
                  Self-Employed
                </label>
                <label>
                  <input
                    type="radio"
                    name="employmentStatus"
                    value="Retired"
                    checked={form.employmentStatus === "Retired"}
                    onChange={handleChange}
                    style={{ marginRight: 6 }}
                  />
                  Retired
                </label>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Annual Household income?</label>
              <input
                type="text"
                name="householdIncome"
                value={form.householdIncome}
                onChange={handleChange}
                style={styles.input}
                placeholder='Please give estimate of your household income here.'
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>What is your favorite Social Media platform (Facebook, X, Tik Tok, etc.). Please specify:</label>
              <input
                type="text"
                name="socialMedia"
                value={form.socialMedia}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            
            <div style={styles.formGroup}>
              <label style={styles.label}>Do you have a pet?</label>
              <div>
                <label style={{ marginRight: 16 }}>
                  <input
                    type="radio"
                    name="petStatus"
                    value="Yes"
                    checked={form.petStatus === "Yes"}
                    onChange={handleChange}
                    style={{ marginRight: 6 }}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="petStatus"
                    value="No"
                    checked={form.petStatus === "No"}
                    onChange={handleChange}
                    style={{ marginRight: 6 }}
                  />
                  No
                </label>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}><strong>YOUR COMMENT OR FEEDBACK IS MUCH APPRECIATED</strong></label>
              <textarea
                name="fedback"
                value={form.fedback}
                onChange={handleChange}
                style={{ ...styles.input, height: 80 }}
                placeholder='*Please share, how is your experience with VIRON so far, and/or please share how VIRON can serve you better.'
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
    maxWidth: '1000px',
    margin: '3rem auto',
    padding: '2.5rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    fontWeight: 600,
    color: '#1e2a38',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '2rem',
  },
  col: {
    flex: '1 1 48%',
    minWidth: '280px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    padding: '0.5rem 0',
    fontWeight: 500,
    color: '#333',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    transition: 'border 0.3s ease',
    outline: 'none',
  },
  button: {
    marginTop: '2rem',
    padding: '14px',
    backgroundColor: '#4fa3f7',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    color: '#2ecc71',
  },
};


export default EditAccount;
