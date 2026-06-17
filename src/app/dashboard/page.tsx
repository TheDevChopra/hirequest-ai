import React from 'react';
import { Target, Zap, ArrowRight, Eye, Briefcase, Calendar } from 'lucide-react';
import { getDashboardStats } from '@/actions/dashboard';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const stats = await getDashboardStats();

  if (!stats || !stats.user) {
    return <div style={{ padding: '2rem' }}>Loading Dashboard...</div>;
  }

  const { user, activeApps, recentApps, recommendedOpps } = stats;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>Good morning, {user.name?.split(' ')[0] || 'User'}.</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Here's your career progress for today.</p>
      </header>

      {/* Top Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Target size={14} /> Level {user.level}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 600 }}>{user.currentXP} XP</div>
          <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', marginTop: '0.5rem', overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: 'var(--accent-blue)' }}></div>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Briefcase size={14} /> Active Apps</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 600 }}>{activeApps}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>↑ +1 this week</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Eye size={14} /> Profile Views</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 600 }}>{user.profile?.profileViews || 0}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>+14 in last 7 days</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Zap size={14} /> Daily Streak</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 600 }}>{user.streakDays} Days</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keep it up!</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem' }}>
        
        {/* Active Pipeline */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Recent Applications</h2>
            <a href="/applications" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>View all <ArrowRight size={14} /></a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentApps.length === 0 ? (
              <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No recent applications found.</div>
            ) : recentApps.map(app => (
              <div key={app.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.05rem', fontWeight: 600 }}>{app.roleTitle}</h4>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Briefcase size={14} /> {app.company}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <Calendar size={14} /> {format(new Date(app.createdAt), 'MMM d')}
                  </div>
                  <span style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '0.35rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', textTransform: 'capitalize' }}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Quests */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Recommended Roles</h2>
            <a href="/opportunities" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>More <ArrowRight size={14} /></a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recommendedOpps.length === 0 ? (
              <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No recommendations yet.</div>
            ) : recommendedOpps.map(opp => (
              <div key={opp.id} className="card" style={{ padding: '1.25rem', cursor: 'pointer', transition: 'border-color 0.2s', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1rem' }}>{opp.title}</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{opp.company} • {opp.location}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', background: 'rgba(0,122,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>92% Match</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Apply</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
