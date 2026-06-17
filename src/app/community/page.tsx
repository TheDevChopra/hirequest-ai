'use client';

import React from 'react';
import { Users, MessageSquare, ArrowUp, Hash } from 'lucide-react';

export default function CommunityPlatform() {
  const posts = [
    { id: 1, title: 'How I transitioned from Support to Product Management', author: 'Alex Rivera', upvotes: 342, comments: 45, time: '2h ago', tag: 'Career Advice' },
    { id: 2, title: 'Review my resume: Junior Frontend Engineer', author: 'Sam Chen', upvotes: 128, comments: 22, time: '5h ago', tag: 'Resume Review' },
    { id: 3, title: 'Stripe just opened 50 new remote engineering roles', author: 'Tech Recruiter', upvotes: 89, comments: 12, time: '1d ago', tag: 'Hiring' }
  ];

  const guilds = ['Frontend Engineering', 'Product Management', 'UI/UX Design', 'Indie Hackers'];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Community</h1>
          <p style={{ color: 'var(--text-muted)' }}>Connect with peers, get advice, and join professional guilds.</p>
        </div>
        <button className="btn btn-primary">New Post</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '3rem' }}>
        
        <div>
          <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-main)', borderBottom: '2px solid var(--text-main)', paddingBottom: '1rem', marginBottom: '-1rem' }}>Trending</span>
            <span style={{ color: 'var(--text-muted)' }}>Newest</span>
            <span style={{ color: 'var(--text-muted)' }}>Following</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.map(post => (
              <div key={post.id} className="card" style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><ArrowUp size={20} /></button>
                  <span style={{ fontWeight: 500 }}>{post.upvotes}</span>
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', background: 'var(--bg-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>{post.tag}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Posted by {post.author} • {post.time}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>{post.title}</h3>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MessageSquare size={16} /> {post.comments} Comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <section className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={18} /> Your Guilds</h3>
            <ul className="clean-list">
              {guilds.map((guild, idx) => (
                <li key={idx} style={{ padding: '0.75rem 0', display: 'flex', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <Hash size={16} color="var(--text-muted)" /> {guild}
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Upcoming Events</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.9rem' }}>
                <div style={{ fontWeight: 500 }}>Resume Review AMAs</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Tomorrow, 2:00 PM PST</div>
              </div>
              <div style={{ fontSize: '0.9rem' }}>
                <div style={{ fontWeight: 500 }}>Mock Interview Relay</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Friday, 10:00 AM PST</div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
