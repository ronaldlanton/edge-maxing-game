import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import Leaderboard from './components/Leaderboard';

// Game states
export type GameState = 'start' | 'playing' | 'gameOver' | 'leaderboard';

// Player data type
export interface PlayerData {
  name: string;
  score: number;
  time: number;
}

function App() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('start');
  
  // Player data
  const [playerName, setPlayerName] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [gameTime, setGameTime] = useState<number>(0);
  
  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<PlayerData[]>(() => {
    const savedLeaderboard = localStorage.getItem('edgeMaxingLeaderboard');
    return savedLeaderboard ? JSON.parse(savedLeaderboard) : [];
  });

  // Handle game over
  const handleGameOver = (finalScore: number, finalTime: number) => {
    setScore(finalScore);
    setGameTime(finalTime);
    
    // Look for existing player in leaderboard
    const existingPlayerIndex = leaderboard.findIndex(entry => entry.name === playerName);
    
    // Only update if player exists in leaderboard
    if (existingPlayerIndex !== -1) {
      // Player exists, update their score if the new score is higher
      const existingPlayer = leaderboard[existingPlayerIndex];
      if (finalScore > existingPlayer.score) {
        const updatedLeaderboard = [...leaderboard];
        updatedLeaderboard[existingPlayerIndex] = {
          ...existingPlayer,
          score: finalScore,
          time: finalTime
        };
        
        // Sort leaderboard by score
        updatedLeaderboard.sort((a, b) => b.score - a.score);
        setLeaderboard(updatedLeaderboard);
        
        // Save to localStorage
        localStorage.setItem('edgeMaxingLeaderboard', JSON.stringify(updatedLeaderboard));
      }
    }
    
    setGameState('gameOver');
  };

  // Start the game
  const startGame = (name: string) => {
    setPlayerName(name);
    setGameState('playing');
  };

  // Show leaderboard
  const showLeaderboard = () => {
    setGameState('leaderboard');
  };

  // Return to start screen
  const returnToStart = () => {
    setGameState('start');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Edge Maxing</h1>
        <p>An exciting tapping game that tests your reflexes and timing!</p>
        
        <div className="game-options">
          <a href="/edge-maxing.html" className="game-button">
            Play Standalone Version
          </a>
        </div>
        
        <div className="game-info">
          <h2>How to Play</h2>
          <ul>
            <li>Tap to fill the bar</li>
            <li>Don't let it drop to zero or overflow</li>
            <li>Cross the white line for 1 point</li>
            <li>Cross the blue line for 3 points</li>
            <li>Score 40 points in 60 seconds to win!</li>
          </ul>
        </div>
      </header>
      
      {gameState === 'start' && (
        <StartScreen onStartGame={startGame} />
      )}
      
      {gameState === 'playing' && (
        <GameScreen 
          playerName={playerName} 
          onGameOver={handleGameOver} 
        />
      )}
      
      {gameState === 'gameOver' && (
        <GameOverScreen 
          playerName={playerName}
          score={score}
          time={gameTime}
          onRestart={returnToStart}
          onShowLeaderboard={showLeaderboard}
        />
      )}
      
      {gameState === 'leaderboard' && (
        <Leaderboard 
          entries={leaderboard} 
          onBack={returnToStart} 
        />
      )}
    </div>
  );
}

export default App;