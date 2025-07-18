import React from 'react';

const Square = ({ value }) => {
  const style = {
    width: '10px',
    height: '10px',
    border: '0.5px solid #ccc',
    display: 'inline-block',
    boxSizing: 'border-box',
  };

  if (value === 1) {
    // 黒いセル
    style.backgroundColor = 'black';
  } else if (value === 3) {
    // アリがいるセル
    style.backgroundColor = 'white';
    style.position = 'relative';
    return (
      <div style={style}>
        <img 
          src="/ant.svg" 
          alt="ant" 
          style={{ 
            width: '100%', 
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }} 
        />
      </div>
    );
  } else {
    // 白いセル（値が0）
    style.backgroundColor = 'white';
  }

  return <div style={style}></div>;
};

export default Square;
