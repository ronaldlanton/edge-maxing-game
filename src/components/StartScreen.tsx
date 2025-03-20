import React, { useState, useEffect } from 'react';

interface StartScreenProps {
  onStartGame: (name: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already in leaderboard
    const savedLeaderboard = localStorage.getItem('edgeMaxingLeaderboard');
    if (savedLeaderboard && name.trim() !== '') {
      const leaderboard = JSON.parse(savedLeaderboard);
      const existingPlayer = leaderboard.find((entry: any) => entry.name === name);
      setRegistered(!!existingPlayer);
    } else {
      setRegistered(false);
    }
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === '') {
      setError('Please enter your name');
      return;
    }
    
    onStartGame(name);
  };

  const handleRegister = () => {
    if (name.trim() === '') {
      setError('Please enter your name');
      return;
    }

    // Add player to leaderboard with 0 score
    const savedLeaderboard = localStorage.getItem('edgeMaxingLeaderboard');
    const leaderboard = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];
    
    // Check if player already exists
    const existingPlayer = leaderboard.find((entry: any) => entry.name === name);
    
    if (!existingPlayer) {
      const newEntry = {
        name: name,
        score: 0,
        time: 0
      };
      leaderboard.push(newEntry);
      localStorage.setItem('edgeMaxingLeaderboard', JSON.stringify(leaderboard));
      setRegistered(true);
    }
  };

  return (
    <div className="start-screen">
      <h1>Edge Maxing</h1>
      <p className="game-instructions">
        Keep tapping to fill the bar without letting it drop to zero or overflow.
        <br />
        The closer you keep it to the top, the more points you'll earn!
        <br />
        <small>Note: Register as an agent first to track your high score!</small>
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="playerName">Enter your agent name:</label>
          <input 
            type="text" 
            id="playerName" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Agent name"
          />
          {error && <p className="error">{error}</p>}
          {registered && <p className="success">Agent registered in leaderboard!</p>}
        </div>
        
        <div className="buttons">
          {!registered && (
            <button type="button" className="register-button" onClick={handleRegister}>
              Register Agent
            </button>
          )}
          <button type="submit" className="start-button">Start Game</button>
        </div>
      </form>
    </div>
  );
};

export default StartScreen;