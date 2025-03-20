import React from 'react';

interface LeaderboardEntry {
  name: string;
  score: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onBack }) => {
  return (
    <div className="leaderboard-screen">
      <h2 className="title">Leaderboard</h2>
      <div className="leaderboard">
        {entries.map((entry, index) => (
          <div key={index} className="leaderboard-entry">
            <span>{index + 1}. {entry.name}</span>
            <span>{Math.floor(entry.score)}</span>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="leaderboard-entry">
            <span>No scores yet!</span>
          </div>
        )}
      </div>
      <button className="button" onClick={onBack} style={{ marginTop: '20px' }}>
        Back to Start
      </button>
    </div>
  );
};

export default Leaderboard;