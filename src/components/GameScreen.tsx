import React, { useState, useEffect, useRef, useCallback } from 'react';

interface GameScreenProps {
  playerName: string;
  onGameOver: (score: number, time: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ playerName, onGameOver }) => {
  // Game parameters
  const MAX_LEVEL = 100; // Maximum fill level (%)
  const MIN_LEVEL = 0;   // Minimum fill level (%)
  const FILL_RATE = 5;   // How much each tap fills (%)
  const DROP_RATE = 1; // How fast the level drops per frame (%)
  const POINTS_MULTIPLIER = 2; // Points multiplier for high levels
  
  // Game state
  const [fillLevel, setFillLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [highScore, setHighScore] = useState<number>(0);
  
  // Animation frame reference
  const animationFrameRef = useRef<number | null>(null);
  
  // Time tracking
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const gameStartTimeRef = useRef<number>(Date.now());
  
  // Get player's high score from leaderboard on mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('edgeMaxingLeaderboard');
    if (savedLeaderboard) {
      const leaderboard = JSON.parse(savedLeaderboard);
      const playerEntry = leaderboard.find((entry: any) => entry.name === playerName);
      if (playerEntry) {
        setHighScore(playerEntry.score);
      }
    }
  }, [playerName]);
  
  // Handle game loop
  const gameLoop = useCallback(() => {
    if (!isGameActive) return;
    
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000; // in seconds
    lastUpdateTimeRef.current = currentTime;
    
    // Update time
    setTime(Math.floor((currentTime - gameStartTimeRef.current) / 1000));
    
    // Update fill level - it drops over time
    setFillLevel(prevLevel => {
      const newLevel = Math.max(MIN_LEVEL, prevLevel - DROP_RATE);
      
      // Game over if level drops to zero
      if (newLevel <= MIN_LEVEL) {
        setIsGameActive(false);
        return MIN_LEVEL;
      }
      
      return newLevel;
    });
    
    // Update score - more points when near the top
    setScore(prevScore => {
      // Points calculated based on current fill level
      // Higher fill levels give exponentially more points
      const levelFactor = fillLevel / MAX_LEVEL;
      const pointsThisFrame = Math.floor(levelFactor * levelFactor * POINTS_MULTIPLIER * 100);
      return prevScore + pointsThisFrame;
    });
    
    // Continue the game loop
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [isGameActive, fillLevel]);
  
  // Handle tap to fill
  const handleTap = () => {
    if (!isGameActive) return;
    
    setFillLevel(prevLevel => {
      const newLevel = prevLevel + FILL_RATE;
      
      // Game over if level exceeds maximum
      if (newLevel >= MAX_LEVEL) {
        setIsGameActive(false);
        return MAX_LEVEL;
      }
      
      return newLevel;
    });
  };
  
  // Start game loop
  useEffect(() => {
    gameStartTimeRef.current = Date.now();
    lastUpdateTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    
    // Clean up animation frame on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);
  
  // Handle game over
  useEffect(() => {
    if (!isGameActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      onGameOver(score, time);
    }
  }, [isGameActive, onGameOver, score, time]);
  
  return (
    <>
      <div className="game-screen" onClick={handleTap}>
        <div className="game-info">
          <div className="time-display">
            <p>Time: {time}s</p>
          </div>
        </div>
        
        <div className="game-area">
          <div className="level-bar-container">
            <div className="score-above-bar">
              <p>Score: {score}</p>
            </div>
            <div 
              className="level-bar-fill" 
              style={{ height: `${fillLevel}%` }}
            />
            <div className="level-bar-marker" style={{ bottom: '90%' }} />
          </div>
          
          <div className="tap-instruction">
            <p>TAP TO FILL</p>
          </div>
        </div>
      </div>
      
      <div className="game-footer">
        <div className="agent-info">
          <p className="agent-name">{playerName}</p>
          <p className="agent-high-score">High Score: {highScore}</p>
        </div>
      </div>
    </>
  );
};

export default GameScreen; 