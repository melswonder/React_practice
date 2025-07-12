import React from 'react';
import { RPS_IMAGES, IMAGE_SIZE } from '../../constants/gameImages';
import './GameBoard.css';

const GameBoard = ({ playerHand, computerHand }) => {
  return (
    <div className="game-board">
      <div className="hand">
        <h3>あなた</h3>
        <img 
          src={RPS_IMAGES[playerHand]} 
          alt="プレイヤーの手" 
          width={IMAGE_SIZE} 
          height={IMAGE_SIZE}
        />
      </div>
      <div className="hand">
        <h3>あいて</h3>
        <img 
          src={RPS_IMAGES[computerHand]} 
          alt="相手の手" 
          width={IMAGE_SIZE} 
          height={IMAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default GameBoard;