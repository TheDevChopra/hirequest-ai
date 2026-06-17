import React from 'react';
import { Search, MapPin, Building, DollarSign, Filter } from 'lucide-react';
import { getOpportunities } from '@/actions/opportunities';

export const dynamic = 'force-dynamic';

export default async function OpportunitiesMarketplace() {
  const jobs = await getOpportunities();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Opportunities</h1>
        <p style={{ color: 'var(--text-muted)' }}>Discover high-quality roles curated for your career trajectory.</p>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.75rem' }} />
          <input type="text" placeholder="Search roles, companies, or keywords..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem' }} />
        </div>
        <button className="btn"><Filter size={18} /> Filters</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {jobs.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>No opportunities found.</div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{job.title}</h3>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Building size={16} color="var(--text-muted)" /> {job.company}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><MapPin size={16} color="var(--text-muted)" /> {job.location}</span>
                  {(job.salaryMin && job.salaryMax) && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><DollarSign size={16} color="var(--text-muted)" /> ${(job.salaryMin/1000)}k - ${(job.salaryMax/1000)}k</span>
                  )}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {job.description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ background: 'rgba(0, 122, 255, 0.1)', color: 'var(--accent-blue)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 500 }}>
                    {job.requirements}
                  </span>
                </div>
              </div>
              
              <div style={{ marginLeft: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Apply</button>
                <button className="btn" style={{ padding: '0.5rem 1.5rem' }}>Save</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
