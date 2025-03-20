import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import Leaderboard from './components/Leaderboard';

type GameState = 'start' | 'playing' | 'gameOver' | 'leaderboard';

type PlayerData = {
  name: string;
  score: number;
};

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [playerName, setPlayerName] = useState<string>('');
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<PlayerData[]>([]);

  const handleGameOver = (score: number) => {
    setCurrentScore(score);
    if (score > highScore) {
      setHighScore(score);
    }
    const newLeaderboardEntry: PlayerData = {
      name: playerName,
      score: score,
    };
    const newLeaderboard = [...leaderboard, newLeaderboardEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(newLeaderboard);
    setGameState('gameOver');
  };

  const startGame = (name: string) => {
    setPlayerName(name);
    setGameState('playing');
  };

  const showLeaderboard = () => {
    setGameState('leaderboard');
  };

  const returnToStart = () => {
    setGameState('start');
  };

  return (
    <div className="App">
      <div className="game-container">
        {gameState === 'start' && (
          <StartScreen onStart={startGame} />
        )}
        {gameState === 'playing' && (
          <GameScreen
            playerName={playerName}
            highScore={highScore}
            onGameOver={handleGameOver}
          />
        )}
        {gameState === 'gameOver' && (
          <GameOverScreen
            score={currentScore}
            onRestart={() => setGameState('playing')}
            onLeaderboard={showLeaderboard}
          />
        )}
        {gameState === 'leaderboard' && (
          <Leaderboard
            entries={leaderboard}
            onBack={returnToStart}
          />
        )}
      </div>
    </div>
  );
}

export default App;