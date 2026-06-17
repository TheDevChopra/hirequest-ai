import React from 'react';
import { MapPin, Briefcase, Award, TrendingUp, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { getUserProfile } from '@/actions/profile';

export const dynamic = 'force-dynamic';

export default async function ComprehensiveProfile() {
  const user = await getUserProfile();

  if (!user || !user.profile) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Profile not found. Please sign in.</div>;
  }

  const { profile } = user;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      
      {/* Profile Header */}
      <div className="card" style={{ padding: '3rem', display: 'flex', gap: '3rem', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--text-main)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 600 }}>
          {user.name ? user.name[0].toUpperCase() : 'U'}
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{user.name}</h1>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 400, marginBottom: '1rem' }}>{profile.experienceLevel} {profile.currentRole || 'Frontend Architect'}</h2>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16} /> {profile.location || 'Remote'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={16} /> 6 Years Exp</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-primary" style={{ width: '100%' }}>Edit Profile</button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn" style={{ padding: '0.5rem' }}><LinkIcon size={18} /></button>
            <button className="btn" style={{ padding: '0.5rem' }}><LinkIcon size={18} /></button>
            <button className="btn" style={{ padding: '0.5rem' }}><ExternalLink size={18} /></button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Left Column - Main Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>About</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              {profile.about || "Passionate engineer focused on building highly performant applications."}
            </p>
          </section>

          <section className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Experience</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border-color)' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-main)' }}></div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Senior Frontend Engineer</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Stripe • 2021 - Present</div>
                <ul className="clean-list" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', paddingLeft: '1rem', listStyleType: 'disc' }}>
                  <li style={{ borderBottom: 'none', padding: '0.25rem 0' }}>Led the migration of the core dashboard to Next.js App Router, improving load times by 40%.</li>
                  <li style={{ borderBottom: 'none', padding: '0.25rem 0' }}>Architected a shared component library used by 50+ engineers.</li>
                </ul>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column - Skills & Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Award size={18} /> Core Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind', 'Figma'].map(skill => (
                <span key={skill} style={{ background: 'var(--bg-color)', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp size={18} /> Profile Analytics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Profile Views (30d)</span>
                <span style={{ fontWeight: 600 }}>{profile.profileViews}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Search Appearances</span>
                <span style={{ fontWeight: 600 }}>{profile.searchAppearances}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Recruiter Saves</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{profile.recruiterSaves}</span>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
