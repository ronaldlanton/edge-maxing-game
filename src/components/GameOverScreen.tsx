import React from 'react';

interface GameOverScreenProps {
  playerName: string;
  score: number;
  time: number;
  onRestart: () => void;
  onShowLeaderboard: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  playerName,
  score,
  time,
  onRestart,
  onShowLeaderboard
}) => {
  return (
    <div className="game-over-screen">
      <h1>Game Over</h1>
      
      <div className="results">
        <h2>Results</h2>
        <p className="player-name">Player: {playerName}</p>
        <p className="final-score">Score: {score}</p>
        <p className="final-time">Time: {time} seconds</p>
      </div>
      
      <div className="buttons">
        <button className="restart-button" onClick={onRestart}>
          Play Again
        </button>
        <button className="leaderboard-button" onClick={onShowLeaderboard}>
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;