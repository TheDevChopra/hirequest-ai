'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { getChatHistory, saveChatMessage } from '@/actions/assistant';

export default function CareerAssistant() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachedDoc, setAttachedDoc] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHistory = async () => {
      const history = await getChatHistory();
      if (history.length > 0) {
        setMessages(history);
      } else {
        setMessages([{ role: 'assistant', content: 'Hello! I am your Career Assistant. I have been deeply integrated with your local Ollama AI. How can I help you optimize your career today?' }]);
      }
    };
    loadHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Save user message to DB
    await saveChatMessage('user', userMessage);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, attachedDoc }),
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        // Save assistant message to DB
        await saveChatMessage('assistant', data.reply);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', height: 'calc(100vh - 6rem)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Career Assistant</h1>
        <p style={{ color: 'var(--text-muted)' }}>Get personalized advice, cover letters, and interview tips powered by local AI.</p>
      </header>

      <div className="card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.role === 'user' ? 'You' : 'Assistant'}
              </div>
              <div style={{
                background: msg.role === 'user' ? 'var(--text-main)' : 'var(--bg-color)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-main)',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                lineHeight: 1.6
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)', animation: 'pulse 1.5s infinite' }}></div>
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'var(--card-bg)' }}>
          {attachedDoc && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', width: 'fit-content' }}>
              <Paperclip size={12} /> {attachedDoc}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setAttachedDoc(null)}>✕</button>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '0.5rem' }}>
            <button className="btn" style={{ padding: '0.5rem', border: 'none', background: 'transparent', color: 'var(--text-muted)' }} onClick={() => setAttachedDoc('resume.pdf')}>
              <Paperclip size={18} />
            </button>
            <textarea 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message Assistant..."
              style={{ flexGrow: 1, border: 'none', background: 'transparent', outline: 'none', resize: 'none', padding: '0.5rem 0', fontFamily: 'inherit', color: 'var(--text-main)' }}
              rows={1}
            />
            <button className="btn btn-primary" onClick={handleSend} disabled={loading} style={{ padding: '0.5rem', borderRadius: '6px' }}>
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
