'use client';

import React, { useState } from 'react';
import { Mic, Type, Play, Square, Activity, FileText } from 'lucide-react';

export default function InterviewPractice() {
  const [sessionActive, setSessionActive] = useState(false);
  const [mode, setMode] = useState<'voice' | 'text'>('text');
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<{actor: 'interviewer'|'candidate', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [interviewState, setInterviewState] = useState('active');

  const startSession = (selectedMode: 'voice' | 'text') => {
    setMode(selectedMode);
    setSessionActive(true);
    setConversation([
      { actor: 'interviewer', text: "Welcome to your mock interview. Let's start with a classic: Tell me about a time you had to deal with a difficult teammate, and how you resolved the conflict?" }
    ]);
  };

  const endInterview = async () => {
    setInterviewState('feedback');
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        const { saveInterviewScore } = await import('@/actions/interview');
        await saveInterviewScore('Behavioral', 85);
      } catch (err) {
        console.error("Failed to save interview", err);
      }
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = input;
    setInput('');
    setConversation(prev => [...prev, { actor: 'candidate', text: msg }]);
    
    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        { actor: 'interviewer', text: "That's an interesting approach. How did that impact the project timeline?" }
      ]);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', height: 'calc(100vh - 6rem)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Interview Practice</h1>
        <p style={{ color: 'var(--text-muted)' }}>Hone your skills with AI-driven behavioral and technical mock interviews.</p>
      </header>

      {!sessionActive ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: '12px' }}><Type size={32} color="var(--accent-blue)" /></div>
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Text-Based Mock</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Practice articulating your thoughts clearly through writing. Great for preparing STAR method stories.</p>
            </div>
            <button className="btn btn-primary" onClick={() => startSession('text')}>Start Text Session</button>
          </div>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: '12px' }}><Mic size={32} color="var(--accent-purple)" /></div>
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Voice-Based Mock</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>Simulate a real phone screen or video call. Evaluates your confidence, pacing, and clarity.</p>
            </div>
            <button className="btn btn-primary" onClick={() => startSession('voice')}>Start Voice Session</button>
          </div>
          
          <div className="card" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Recent Performance</h3>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg. Confidence</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>88%</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg. Clarity</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>92%</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sessions Completed</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>14</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)' }}></div>
              Interview in Progress ({mode})
            </div>
            <button className="btn" onClick={() => setSessionActive(false)}><Square size={14} /> End Session</button>
          </div>
          
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {conversation.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.actor === 'candidate' ? 'flex-end' : 'flex-start',
                maxWidth: '80%'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textAlign: msg.actor === 'candidate' ? 'right' : 'left' }}>
                  {msg.actor === 'candidate' ? 'You' : 'AI Interviewer'}
                </div>
                <div style={{
                  background: msg.actor === 'candidate' ? 'var(--text-main)' : 'var(--bg-color)',
                  color: msg.actor === 'candidate' ? '#fff' : 'var(--text-main)',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: msg.actor === 'interviewer' ? '1px solid var(--border-color)' : 'none',
                  lineHeight: 1.5
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>
            {mode === 'text' ? (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  className="clean-input" 
                  value={input} 
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type your response..." 
                />
                <button className="btn btn-primary" onClick={handleSend}>Reply</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--accent-blue)' }}>
                  <Activity size={24} /> Recording Audio...
                </div>
                <button className="btn btn-primary" onClick={handleSend} style={{ borderRadius: '50%', width: '56px', height: '56px', padding: 0 }}><Play size={24} style={{ marginLeft: '4px' }} /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
