import { useState, useCallback, useRef, useReducer } from 'react';
import { IgrSlider } from 'igniteui-react'; //slider
import 'igniteui-webcomponents/themes/light/bootstrap.css'; //slider
import Square from './Board/Square.js';
import './App.css';

const GRID_HEIGHT = 100;
const GRID_WIDTH = 100;

// 方向: 0=上, 1=右, 2=下, 3=左
const DIRECTIONS = [
  [-1, 0], // 上
  [0, 1],  // 右
  [1, 0],  // 下
  [0, -1]  // 左
];

const initialState = {
  grid: Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0)),
  antPosition: {
    x: Math.floor(GRID_WIDTH / 2),
    y: Math.floor(GRID_HEIGHT / 2),
    direction: 0
  },
  step: 0
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'MOVE_ANT': {
      const newGrid = state.grid.map(row => [...row]);
      const currentCell = newGrid[state.antPosition.y][state.antPosition.x];
      let newDirection = state.antPosition.direction;
      
      // ラングトンのアリのルール
      if (currentCell === 0) { // 白いセル
        // 右に90度回転
        newDirection = (state.antPosition.direction + 1) % 4;
        newGrid[state.antPosition.y][state.antPosition.x] = 1; // 黒に変更
      } else if (currentCell === 1) { // 黒いセル
        // 左に90度回転
        newDirection = (state.antPosition.direction + 3) % 4;
        newGrid[state.antPosition.y][state.antPosition.x] = 0; // 白に変更
      }
      
      // 新しい位置を計算
      const [dy, dx] = DIRECTIONS[newDirection];
      let newX = state.antPosition.x + dx;
      let newY = state.antPosition.y + dy;
      
      // 境界チェック（グリッドの端で折り返し）
      if (newX < 0) newX = GRID_WIDTH - 1;
      if (newX >= GRID_WIDTH) newX = 0;
      if (newY < 0) newY = GRID_HEIGHT - 1;
      if (newY >= GRID_HEIGHT) newY = 0;
      
      return {
        ...state,
        grid: newGrid,
        antPosition: {
          x: newX,
          y: newY,
          direction: newDirection
        },
        step: state.step + 1
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [sliderVal, setSliderVal] = useState(100);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleSliderInput = (event) => {
    setSliderVal(event.detail);
    // 実行中の場合は間隔を更新
    if (isRunning) {
      stopSimulation();
      setTimeout(() => {
        setIsRunning(true);
        intervalRef.current = setInterval(moveAnt, event.detail);
      }, 0);
    }
  };

  const moveAnt = useCallback(() => {
    dispatch({ type: 'MOVE_ANT' });
  }, []);

  const startSimulation = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(moveAnt, sliderVal); // 100ms間隔
    }
  };

  const stopSimulation = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetSimulation = () => {
    stopSimulation();
    dispatch({ type: 'RESET' });
  };

  const stepOnce = () => {
    if (!isRunning) {
      moveAnt();
    }
  };

  // アリの位置にマークを付けたグリッドを作成
  const gridWithAnt = state.grid.map((row, y) => 
    row.map((cell, x) => 
      x === state.antPosition.x && y === state.antPosition.y ? 3 : cell
    )
  );

  return (
    <div className="app">
      <h1>ラングトンのアリ</h1>
      <div className="controls">
        <div className="speed-control">
          <label>実行速度（ミリ秒間隔）: {sliderVal}ms</label>
          <IgrSlider
            style={{ padding: "10px 30px 20px 30px", width: "300px" }}
            onInput={handleSliderInput}
            value={sliderVal}
            min={0}
            max={1000}
            step={10}
          />
        </div>
        <div className="button-group">
          <button onClick={startSimulation} disabled={isRunning}>
            開始
          </button>
          <button onClick={stopSimulation} disabled={!isRunning}>
            停止
          </button>
          <button onClick={resetSimulation}>
            リセット
          </button>
          <button onClick={stepOnce} disabled={isRunning}>
            1ステップ
          </button>
        </div>
      </div>
      <div className="info">
        <p>ステップ数: {state.step}</p>
        <p>アリの位置: ({state.antPosition.x}, {state.antPosition.y})</p>
        <p>向き: {['上', '右', '下', '左'][state.antPosition.direction]}</p>
      </div>
      <div className="grid">
        {gridWithAnt.map((row, y) => (
          <div key={y} className="grid-row">
            {row.map((cell, x) => (
              <Square key={`${x}-${y}`} value={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
