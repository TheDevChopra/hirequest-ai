'use client';

import React, { useState } from 'react';
import { Search, Send, Paperclip, Phone, Video, MoreVertical } from 'lucide-react';

export default function MessagesPlatform() {
  const [activeChat, setActiveChat] = useState(1);
  
  const contacts = [
    { id: 1, name: 'Sarah Jenkins', role: 'Technical Recruiter at Stripe', time: '10:42 AM', unread: true, lastMsg: 'Are you available for a quick chat tomorrow?' },
    { id: 2, name: 'David Lee', role: 'Engineering Manager', time: 'Yesterday', unread: false, lastMsg: 'Thanks for the portfolio link, looks great.' },
    { id: 3, name: 'Frontend Guild', role: 'Group Chat', time: 'Tuesday', unread: false, lastMsg: 'Alex: Does anyone have experience with...' }
  ];

  return (
    <div style={{ height: 'calc(100vh - 6rem)', display: 'flex', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: 'var(--card-bg)' }}>
      
      {/* Left Sidebar - Thread List */}
      <div style={{ width: '320px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', background: 'var(--bg-color)' }}>
        <div style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>Messages</h2>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem' }}>
            <Search size={16} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
            <input type="text" placeholder="Search messages..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
          </div>
        </div>
        
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {contacts.map(contact => (
            <div 
              key={contact.id} 
              onClick={() => setActiveChat(contact.id)}
              style={{ 
                padding: '1.25rem 1rem', 
                borderBottom: '1px solid var(--border-color)', 
                cursor: 'pointer',
                background: activeChat === contact.id ? 'var(--card-bg)' : 'transparent',
                borderLeft: activeChat === contact.id ? '3px solid var(--text-main)' : '3px solid transparent'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: contact.unread ? 600 : 500, fontSize: '0.95rem' }}>{contact.name}</span>
                <span style={{ fontSize: '0.75rem', color: contact.unread ? 'var(--accent-blue)' : 'var(--text-muted)' }}>{contact.time}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{contact.role}</div>
              <div style={{ fontSize: '0.85rem', color: contact.unread ? 'var(--text-main)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: contact.unread ? 500 : 400 }}>
                {contact.lastMsg}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content - Active Chat */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        <header style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Sarah Jenkins</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Technical Recruiter at Stripe</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
            <Phone size={20} style={{ cursor: 'pointer' }} />
            <Video size={20} style={{ cursor: 'pointer' }} />
            <MoreVertical size={20} style={{ cursor: 'pointer' }} />
          </div>
        </header>

        <div style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--card-bg)' }}>
          <div style={{ alignSelf: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Today</div>
          
          <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', lineHeight: 1.5 }}>
              Hi there! I came across your profile and was really impressed by your recent work on the Application Tracker project. We have a Senior Frontend Engineer role opening up at Stripe that I think you'd be a great fit for.
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>10:41 AM</div>
          </div>
          
          <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', lineHeight: 1.5 }}>
              Are you available for a quick chat tomorrow?
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>10:42 AM</div>
          </div>
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '0.5rem' }}>
            <button className="btn" style={{ padding: '0.5rem', border: 'none', background: 'transparent', color: 'var(--text-muted)' }}>
              <Paperclip size={20} />
            </button>
            <input type="text" placeholder="Write a message..." style={{ flexGrow: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem' }} />
            <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '6px' }}>
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
      
    </div>
  );
}
