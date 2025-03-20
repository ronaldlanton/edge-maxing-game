import React, { useState, useEffect, useRef } from 'react';

interface GameScreenProps {
  playerName: string;
  highScore: number;
  onGameOver: (score: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ playerName, highScore, onGameOver }) => {
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);
  const velocityRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        isMovingRef.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        isMovingRef.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateGame = (timestamp: number) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastUpdateTimeRef.current) / 1000;
      lastUpdateTimeRef.current = timestamp;

      if (isMovingRef.current) {
        velocityRef.current.x += 200 * deltaTime;
        velocityRef.current.y += 200 * deltaTime;
      } else {
        velocityRef.current.x = Math.max(0, velocityRef.current.x - 100 * deltaTime);
        velocityRef.current.y = Math.max(0, velocityRef.current.y - 100 * deltaTime);
      }

      const newPosition = {
        x: playerPosition.x + velocityRef.current.x * deltaTime,
        y: playerPosition.y + velocityRef.current.y * deltaTime,
      };

      if (gameAreaRef.current) {
        const bounds = gameAreaRef.current.getBoundingClientRect();
        if (
          newPosition.x < 0 ||
          newPosition.x > bounds.width - 20 ||
          newPosition.y < 0 ||
          newPosition.y > bounds.height - 20
        ) {
          onGameOver(Math.floor(score));
          return;
        }
      }

      setPlayerPosition(newPosition);
      setScore((prevScore) => prevScore + deltaTime * (velocityRef.current.x + velocityRef.current.y) / 100);

      animationFrameRef.current = requestAnimationFrame(updateGame);
    };

    animationFrameRef.current = requestAnimationFrame(updateGame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onGameOver, playerPosition, score]);

  return (
    <div className="game-screen">
      <div className="score">Score: {Math.floor(score)}</div>
      <div className="game-area" ref={gameAreaRef}>
        <div
          className="player"
          style={{
            left: `${playerPosition.x}px`,
            top: `${playerPosition.y}px`,
          }}
        />
      </div>
      <div className="footer">
        <div className="player-info">Player: {playerName}</div>
        <div className="high-score">High Score: {highScore}</div>
      </div>
    </div>
  );
};

export default GameScreen;