import React from 'react';
import { PlayerData } from '../App';

interface LeaderboardProps {
  entries: PlayerData[];
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onBack }) => {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      
      {entries.length === 0 ? (
        <p className="no-entries">No scores yet. Be the first to play!</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={`${entry.name}-${index}`}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
                <td>{entry.time}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <button className="back-button" onClick={onBack}>
        Back to Main Menu
      </button>
    </div>
  );
};

export default Leaderboard;