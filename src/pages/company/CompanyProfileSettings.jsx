import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import './Company.css';

function CompanyProfileSettings() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [formData, setFormData] = useState({
    company_name: '',
    full_name: '',
    website: '',
    industry: '',
    company_size: '',
    description: ''
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        company_name: profile.company_name || user?.user_metadata?.company_name || '',
        full_name: profile.full_name || user?.user_metadata?.full_name || '',
        website: profile.website || user?.user_metadata?.website || '',
        industry: profile.industry || user?.user_metadata?.industry || '',
        company_size: profile.company_size || user?.user_metadata?.company_size || '',
        description: profile.description || ''
      });
    }
  }, [profile, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (db && profile?.id) {
        await updateDoc(doc(db, 'profiles', profile.id), {
          company_name: formData.company_name,
          full_name: formData.full_name,
          website: formData.website,
          industry: formData.industry,
          company_size: formData.company_size,
          description: formData.description,
          updated_at: new Date().toISOString(),
        });
      }
      setSaved(true);
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="company-page">
      <div className="page-header">
        <div>
          <h1>Company Profile</h1>
          <p className="page-subtitle">Manage your company details visible to candidates</p>
        </div>
      </div>

      <div className="profile-settings-card">
        <form onSubmit={handleSave} className="profile-settings-form">
          <div className="profile-form-row">
            <div className="profile-form-group">
              <label>Company Name</label>
              <input
                name="company_name"
                type="text"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Your company name"
                className="input"
              />
            </div>
            <div className="profile-form-group">
              <label>Contact Person</label>
              <input
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Contact person name"
                className="input"
              />
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-form-group">
              <label>Website</label>
              <input
                name="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                placeholder="www.yourcompany.com"
                className="input"
              />
            </div>
            <div className="profile-form-group">
              <label>Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select industry...</option>
                <option value="Banking & Finance">Banking & Finance</option>
                <option value="Oil & Gas">Oil & Gas</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Rail & Infrastructure">Rail & Infrastructure</option>
                <option value="Technology & IT">Technology & IT</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Consulting">Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-form-group">
              <label>Company Size</label>
              <select
                name="company_size"
                value={formData.company_size}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select size...</option>
                <option value="1–10 employees">1–10 employees</option>
                <option value="11–50 employees">11–50 employees</option>
                <option value="51–200 employees">51–200 employees</option>
                <option value="201–500 employees">201–500 employees</option>
                <option value="500+ employees">500+ employees</option>
              </select>
            </div>
            <div className="profile-form-group">
              <label>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="input input-disabled"
              />
            </div>
          </div>

          <div className="profile-form-group full-width">
            <label>Company Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell candidates about your company, culture, and what you're looking for..."
              rows={4}
              className="input"
            />
          </div>

          <div className="profile-form-actions">
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>
        </form>

        <div className="profile-danger-zone">
          <h3>Account</h3>
          <button 
            type="button" 
            onClick={async () => {
              await signOut();
              navigate('/', { replace: true });
            }}
            className="btn btn-danger"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfileSettings;
