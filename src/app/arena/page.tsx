'use client';

import React, { useState } from 'react';
import { Mic, ShieldAlert, Zap } from 'lucide-react';

export default function Arena() {
  const [battleState, setBattleState] = useState<'lobby' | 'combat' | 'victory'>('lobby');
  const [bossHealth, setBossHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [input, setInput] = useState('');
  const [combatLog, setCombatLog] = useState<{actor: 'boss' | 'player', text: string}[]>([]);

  const startBattle = (type: string) => {
    setBattleState('combat');
    setBossHealth(100);
    setPlayerHealth(100);
    const firstQ = `Ah, so you think you can be a ${type}? Tell me about a time you failed and how you recovered.`;
    setCurrentQuestion(firstQ);
    setCombatLog([{ actor: 'boss', text: firstQ }]);
  };

  const handleAnswer = () => {
    if (!input.trim()) return;
    
    const ans = input;
    setInput('');
    setCombatLog(prev => [...prev, { actor: 'player', text: ans }]);
    
    // Simulate AI Boss evaluation
    setTimeout(() => {
      const evaluation = "Good communication, but lacking technical depth.";
      const damageToBoss = 50; 
      const damageToPlayer = 10;
      
      const newBossHealth = Math.max(0, bossHealth - damageToBoss);
      setBossHealth(newBossHealth);
      setPlayerHealth(prev => Math.max(0, prev - damageToPlayer));
      
      if (newBossHealth <= 0) {
        setTimeout(() => setBattleState('victory'), 1000);
      } else {
        const nextQ = "Impressive. Now, how would you design a scalable microservices architecture?";
        setCurrentQuestion(nextQ);
        setCombatLog(prev => [
          ...prev, 
          { actor: 'boss', text: `[EVAL: ${evaluation}]` },
          { actor: 'boss', text: nextQ }
        ]);
      }
    }, 1500);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#ef476f', textShadow: '0 0 10px rgba(239, 71, 111, 0.5)' }}>
          <ShieldAlert style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Interview Arena
        </h1>
        <p style={{ opacity: 0.8 }}>Survive the AI recruiter's questions to earn massive XP and respect.</p>
      </header>

      {battleState === 'lobby' && (
        <div className="panel glass" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h2>Select Your Opponent</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            {['Engineering', 'Marketing', 'Design', 'Sales'].map(type => (
              <button key={type} className="neon-btn" style={{ borderColor: '#ef476f', color: '#ef476f' }} onClick={() => startBattle(type)}>
                {type} Boss
              </button>
            ))}
          </div>
        </div>
      )}

      {battleState === 'combat' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          
          {/* Health Bars */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '40%' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-accent)' }}>You</h3>
              <div className="xp-bar-container" style={{ borderColor: 'var(--text-accent)' }}>
                <div className="xp-bar-fill" style={{ width: `${playerHealth}%`, background: 'var(--text-accent)' }}></div>
              </div>
            </div>
            <div style={{ fontSize: '2rem' }}>⚔️</div>
            <div style={{ width: '40%', textAlign: 'right' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#ef476f' }}>AI Recruiter Boss</h3>
              <div className="xp-bar-container" style={{ borderColor: '#ef476f', transform: 'scaleX(-1)' }}>
                <div className="xp-bar-fill" style={{ width: `${bossHealth}%`, background: '#ef476f' }}></div>
              </div>
            </div>
          </div>

          {/* Combat Log */}
          <div className="panel glass" style={{ height: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {combatLog.map((log, idx) => (
              <div key={idx} style={{ 
                padding: '1rem', 
                borderRadius: '8px', 
                background: log.actor === 'boss' ? 'rgba(239, 71, 111, 0.1)' : 'rgba(102, 252, 241, 0.1)',
                borderLeft: `4px solid ${log.actor === 'boss' ? '#ef476f' : 'var(--text-accent)'}`,
                alignSelf: log.actor === 'boss' ? 'flex-start' : 'flex-end',
                maxWidth: '80%'
              }}>
                <strong style={{ color: log.actor === 'boss' ? '#ef476f' : 'var(--text-accent)' }}>
                  {log.actor === 'boss' ? 'Boss' : 'You'}
                </strong>
                <p style={{ margin: '0.5rem 0 0 0', whiteSpace: 'pre-wrap' }}>{log.text}</p>
              </div>
            ))}
          </div>

          {/* Attack Input */}
          <div className="chat-input-area" style={{ borderRadius: '12px', border: '1px solid #ef476f' }}>
            <button className="neon-btn" style={{ padding: '0.5rem', borderColor: '#ef476f', color: '#ef476f' }}>
              <Mic size={20} />
            </button>
            <textarea 
              className="chat-input" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Formulate your response..."
              style={{ minHeight: '60px', resize: 'vertical' }}
            />
            <button className="neon-btn" onClick={handleAnswer} style={{ background: '#ef476f', color: '#000', borderColor: '#ef476f' }}>
              Strike <Zap size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }} />
            </button>
          </div>
        </div>
      )}

      {battleState === 'victory' && (
        <div className="panel glass" style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px solid #ffd166', boxShadow: '0 0 30px rgba(255, 209, 102, 0.3)' }}>
          <h1 style={{ color: '#ffd166', fontSize: '3rem', margin: '0 0 1rem 0', textShadow: '0 0 10px #ffd166' }}>VICTORY!</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>You defeated the AI Recruiter.</p>
          <div style={{ color: 'var(--text-accent)', fontWeight: 'bold', fontSize: '2rem', margin: '2rem 0' }}>
            +1000 XP
          </div>
          <button className="neon-btn" onClick={() => setBattleState('lobby')}>
            Return to Lobby
          </button>
        </div>
      )}
    </div>
  );
}
