'use client';

import React from 'react';
import { BookOpen, CheckCircle2, Circle, Lock, PlayCircle } from 'lucide-react';

export default function LearningHub() {
  const roadmaps = [
    { title: 'Frontend Engineering', progress: 65, active: true },
    { title: 'System Design', progress: 12, active: true },
    { title: 'Product Management', progress: 0, active: false }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Learning Hub</h1>
        <p style={{ color: 'var(--text-muted)' }}>Master new skills to unlock advanced career opportunities.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Active Roadmap: Frontend Engineering</h2>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 500 }}>Overall Progress</span>
                  <span style={{ color: 'var(--text-muted)' }}>65%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', background: 'var(--accent-blue)' }}></div>
                </div>
              </div>
              
              <ul className="clean-list" style={{ padding: '0 1.5rem' }}>
                <li style={{ padding: '1.25rem 0' }}>
                  <CheckCircle2 size={24} color="var(--accent-green)" />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Advanced React Hooks</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Master useMemo, useCallback, and custom hooks.</div>
                  </div>
                </li>
                <li style={{ padding: '1.25rem 0' }}>
                  <Circle size={24} color="var(--accent-blue)" />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>State Management Architecture</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Zustand, Redux Toolkit, and context performance.</div>
                  </div>
                  <button className="btn" style={{ padding: '0.5rem' }}><PlayCircle size={18} /></button>
                </li>
                <li style={{ padding: '1.25rem 0', opacity: 0.6 }}>
                  <Lock size={24} color="var(--text-muted)" />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Web Performance Optimization</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Core Web Vitals, code splitting, and caching.</div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recommended Micro-Lessons</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--bg-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={20} color="var(--accent-blue)" /></div>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: '0.25rem', fontSize: '0.95rem' }}>Understanding CORS</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>5 min read</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Your Tracks</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {roadmaps.map((r, i) => (
              <div key={i} className="card" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{r.title}</h4>
                  {r.active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)' }}></span>}
                </div>
                <div style={{ width: '100%', height: '4px', background: 'var(--bg-color)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${r.progress}%`, height: '100%', background: r.progress > 0 ? 'var(--text-main)' : 'transparent' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
