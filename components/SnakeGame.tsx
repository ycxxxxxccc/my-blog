'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHighScore, setShowHighScore] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<number | null>(null);
  const foodIdRef = useRef<string>(`food-${Math.random()}`);

  // Generate random food position
  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    // Make sure food doesn't spawn on snake
    const isOnSnake = snake.some(
      segment => segment.x === newFood.x && segment.y === newFood.y
    );

    if (isOnSnake) {
      return generateFood();
    }

    // Update food animation ID
    foodIdRef.current = `food-${Math.random()}`;
    return newFood;
  }, [snake]);

  // Move snake
  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];

      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      newSnake.unshift(newHead);

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => {
          const newScore = prev + 10;
          // Update high score if needed
          setHighScore(currentHigh => {
            if (newScore > currentHigh) {
              setShowHighScore(true);
              setTimeout(() => setShowHighScore(false), 2000);
              return newScore;
            }
            return currentHigh;
          });
          return newScore;
        });
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood]);

  // Game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = window.setInterval(() => {
        moveSnake();
      }, INITIAL_SPEED);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, moveSnake]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          e.preventDefault();
          if (!isPlaying || gameOver) {
            startGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPlaying, gameOver]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setShowHighScore(false);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
    setShowHighScore(false);
  };

  return (
    <div className="snake-game">
      <div className="game-info">
        <h2>贪吃蛇游戏</h2>
        <p>得分: {score}</p>
      </div>

      <div className="game-board" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
        border: '2px solid #333',
        backgroundColor: '#f0f0f0',
        margin: '0 auto',
        width: `${GRID_SIZE * 20}px`,
        height: `${GRID_SIZE * 20}px`,
      }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={index}
              style={{
                width: '20px',
                height: '20px',
                border: '1px solid #ddd',
                backgroundColor: isSnake
                  ? '#4CAF50'
                  : isFood
                  ? '#FF5722'
                  : '#fff',
              }}
            />
          );
        })}
      </div>

      <div className="game-controls">
        {!isPlaying ? (
          <button onClick={startGame}>开始游戏</button>
        ) : (
          <button onClick={() => setIsPlaying(false)}>暂停</button>
        )}
        <button onClick={resetGame}>重置</button>
      </div>

      {gameOver && (
        <div className="game-over">
          <h3>游戏结束!</h3>
          <p>最终得分: {score}</p>
          <button onClick={startGame}>再玩一次</button>
        </div>
      )}

      <div className="game-instructions">
        <p>使用方向键控制蛇的移动，空格键开始/暂停游戏</p>
      </div>
    </div>
  );
}
