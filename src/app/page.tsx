import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', background: 'var(--bg-color)' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.03em', fontWeight: 700 }}>
        Build your career.
      </h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '3rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        HireQuest is the modern productivity space for your professional journey. Track applications, discover opportunities, and prepare for interviews in one calm place.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/dashboard" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
          Open Workspace
        </Link>
        <Link href="/copilot" className="btn" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
          Ask Assistant
        </Link>
      </div>

      <div style={{ marginTop: '5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px' }}>
        <div className="card" style={{ flex: 1, minWidth: '250px', textAlign: 'left', background: 'var(--card-bg)' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--sidebar-bg)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Track Progress</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Keep all your applications, interviews, and offers organized with beautiful charts and clean timelines.</p>
        </div>
        <div className="card" style={{ flex: 1, minWidth: '250px', textAlign: 'left', background: 'var(--card-bg)' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--sidebar-bg)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
          <h3 style={{ marginBottom: '0.5rem' }}>Get Help</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>Access intelligent assistance for resume reviews and interview preparation when you need it.</p>
        </div>
      </div>
    </div>
  );
}
