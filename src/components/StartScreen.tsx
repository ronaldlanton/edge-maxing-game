import React, { useState } from 'react';

interface StartScreenProps {
  onStart: (name: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="start-screen">
      <h1 className="title">Edge Maxing</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            padding: '10px',
            fontSize: '1em',
            marginBottom: '20px',
            width: '200px',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#33ff66',
            border: '1px solid #33ff66',
            borderRadius: '5px',
          }}
        />
        <br />
        <button type="submit" className="button" disabled={!name.trim()}>
          Start Game
        </button>
      </form>
    </div>
  );
};

export default StartScreen;