import React from 'react';
import { RPS_NAMES } from '../../constants/gameImages';
import './Controls.css';

const Controls = ({ onJanken }) => {
  return (
    <div className="controls">
      <p>あなたの手を選んでください</p>
      <div className="buttons">
        {Object.entries(RPS_NAMES).map(([key, name]) => (
          <button 
            key={key}
            onClick={() => onJanken(key)}
            className="choice-button"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;