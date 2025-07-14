// じゃんけんゲームのロジック
import { RPS_IMAGES } from '../constants/gameImages';

export const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return 'あいこ！';
  }
  
  const winConditions = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock'
  };
  
  if (winConditions[playerChoice] === computerChoice) {
    return 'あなたの勝ち！';
  } else {
    return 'あなたの負け！';
  }
};

export const getRandomChoice = () => {
  const choices = Object.keys(RPS_IMAGES);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};