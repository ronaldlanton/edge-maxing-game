import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onLeaderboard: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRestart,
  onLeaderboard,
}) => {
  return (
    <div className="game-over-screen">
      <h2 className="game-over-title">Game Over!</h2>
      <div className="final-score">Final Score: {score}</div>
      <button className="button" onClick={onRestart}>
        Play Again
      </button>
      <button className="button" onClick={onLeaderboard}>
        View Leaderboard
      </button>
    </div>
  );
};

export default GameOverScreen;