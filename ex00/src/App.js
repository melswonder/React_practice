import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import Controls from './components/Controls/Controls';
import Result from './components/Result/Result';
import { determineWinner, getRandomChoice } from './utils/gameLogic';

function App() {
  const [playerHand, setPlayerHand] = useState('rock'); // プレイヤーの手
  const [computerHand, setComputerHand] = useState('rock'); // 相手の手
  const [result, setResult] = useState('じゃんけん！');

  const handleJanken = (playerChoice) => {
    const computerChoice = getRandomChoice();
    const gameResult = determineWinner(playerChoice, computerChoice);
    
    setPlayerHand(playerChoice);
    setComputerHand(computerChoice);
    setResult(gameResult);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>じゃんけんゲーム</h1>
        <Result result={result} />
        <GameBoard playerHand={playerHand} computerHand={computerHand} />
        <Controls onJanken={handleJanken} />
      </header>
    </div>
  );
}

export default App;