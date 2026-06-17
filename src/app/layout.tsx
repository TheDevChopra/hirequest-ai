import type { Metadata } from "next";
import { 
  Home, 
  Briefcase, 
  Columns, 
  FileText, 
  Mic, 
  Sparkles, 
  GraduationCap, 
  Users, 
  MessageSquare, 
  User, 
  Settings 
} from 'lucide-react';
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "HireQuest",
  description: "Career Operating System",
};

function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ padding: '2rem 1.5rem 1rem 1.5rem' }}>
        <div style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '20px', background: 'var(--text-main)', borderRadius: '4px' }}></div>
          HireQuest
        </div>
      </div>
      <nav className="sidebar-nav" style={{ flexGrow: 1, overflowY: 'auto' }}>
        <a href="/dashboard" className="nav-item"><Home size={18} /> Home</a>
        <a href="/opportunities" className="nav-item"><Briefcase size={18} /> Opportunities</a>
        <a href="/applications" className="nav-item"><Columns size={18} /> Applications</a>
        <a href="/resume" className="nav-item"><FileText size={18} /> Resume Studio</a>
        <a href="/interview" className="nav-item"><Mic size={18} /> Interview Practice</a>
        <a href="/assistant" className="nav-item"><Sparkles size={18} /> Career Assistant</a>
        <a href="/learning" className="nav-item"><GraduationCap size={18} /> Learning</a>
        <a href="/community" className="nav-item"><Users size={18} /> Community</a>
        <a href="/messages" className="nav-item"><MessageSquare size={18} /> Messages</a>
        
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <a href="/profile" className="nav-item"><User size={18} /> Profile</a>
          <a href="/settings" className="nav-item"><Settings size={18} /> Settings</a>
        </div>
      </nav>
    </aside>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app-layout">
            <Sidebar />
            <main className="main-content">
              <div className="main-content-inner">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
