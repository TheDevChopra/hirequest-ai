'use client';

import React, { useState } from 'react';
import { updateUserSettings } from '@/actions/settings';
import { Check } from 'lucide-react';

export default function Settings() {
  const [name, setName] = useState('Dev Engineer');
  const [email, setEmail] = useState('dev@hirequest.com');
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateUserSettings(name, email);
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your account preferences and billing.</p>
      </header>

      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Account Information</h2>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            {saved && <span style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}><Check size={16} /> Saved</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
