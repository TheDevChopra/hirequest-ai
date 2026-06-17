'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('dev@hirequest.com');
  const [password, setPassword] = useState('demo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert("Login failed");
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-outfit)' }}>
          <span style={{ width: '28px', height: '28px', background: 'var(--accent-blue)', borderRadius: '6px' }}></span>
          HireQuest
        </div>

        <h1 style={{ fontSize: '1.25rem', marginBottom: '2rem', textAlign: 'center' }}>Log in to your Career OS</h1>

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field" 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.75rem', fontSize: '1rem' }}>
            Continue
          </button>
        </form>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', width: '100%', gap: '0.75rem' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Or continue with</div>
          <button onClick={() => signIn('google')} className="btn" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            Google
          </button>
        </div>

      </div>
    </div>
  );
}
