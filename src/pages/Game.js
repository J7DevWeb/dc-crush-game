import React from 'react';
import { useEffect, useState } from "react";
import batman from '../tokens/batman.png';
import superman from '../tokens/superman.png';
import aquaman from '../tokens/aquaman.png';
import wonderWoman from '../tokens/wonder-woman.png';
import flash from '../tokens/flash.png';
import cyborg from '../tokens/cyborg.png';
import Score from "../components/Score";
import Navigation from '../components/Navigation';

const Game = () => {

    const width = 8;
    const characterTokens =[batman, superman, aquaman, wonderWoman, flash, cyborg];
    const[currentTokenDisplay, setCurrentTokenDisplay] = useState([]);
    const[tokenDraged, setTokenDraged] = useState(null);
    const[tokenTargeted, setTokenTargeted] = useState(null);
    const[finalScore, setFinalScore] = useState(0);
    
    const checkColumn = (loop, point) => {
      for (let i = 0; i < loop; i++){
        let columnOf;
          if (point === 4){
             columnOf = [i, i + width, i + width * 2, i + width * 3];
          } else {
             columnOf = [i, i + width, i + width * 2];
          }
        const choosenColor = currentTokenDisplay[i];
        const isBlank = currentTokenDisplay[i] === '';
  
        if (columnOf.every(boardCase => currentTokenDisplay[boardCase] === choosenColor && !isBlank)){
          setFinalScore((score) => score + point);
          columnOf.forEach(boardCase => currentTokenDisplay[boardCase] = '');
          return true;
        }
      }
    };

    const checkRow = (point) => {
      for (let i = 0; i < 64; i++){
        let rowOf, notValid;
          if(point === 4){
            rowOf = [i, i + 1, i + 2, i + 3];
            notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
          } else{
            rowOf = [i, i + 1, i + 2];
            notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
          }  
        const choosenColor = currentTokenDisplay[i];
        const isBlank = currentTokenDisplay[i] === '';
        
  
        if (notValid.includes(i)) continue
  
        if (rowOf.every(boardCase => currentTokenDisplay[boardCase] === choosenColor && !isBlank)){
          setFinalScore((score) => score + point);
          rowOf.forEach(boardCase => currentTokenDisplay[boardCase] = '');
          return true;
        }
      }
    };
  
    const movingIntoCaseBelow = () => {
      for (let i = 0; i < 64 - width; i++){
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
  
        if (isFirstRow && currentTokenDisplay[i] === '') {
          let randomIndex = Math.floor(Math.random() * characterTokens.length);
          currentTokenDisplay[i] = characterTokens[randomIndex];
        }
  
        if ((currentTokenDisplay[i + width]) === '') {
          currentTokenDisplay[i + width] = currentTokenDisplay[i];
          currentTokenDisplay[i] = '';
        }
      }
    };
  
    const dragStart = (e) => {
      setTokenDraged(e.target);
    };
  
    const dragDrop = (e) => {
      setTokenTargeted(e.target);
    };
  
    const dragEnd = () => {
      if (tokenTargeted != null && tokenTargeted != null) {
      const tokenDragedId = parseInt(tokenDraged.getAttribute('data-id'));
      const tokenTargetedId = parseInt(tokenTargeted.getAttribute('data-id'));
  
      currentTokenDisplay[tokenTargetedId] = tokenDraged.getAttribute('src');
      currentTokenDisplay[tokenDragedId] = tokenTargeted.getAttribute('src');
  
      const validMoves = [
        tokenDragedId - 1,
        tokenDragedId + 1,
        tokenDragedId - width,
        tokenDragedId + width,
      ];
  
      const validMove = validMoves.includes(tokenTargetedId);
      const isColumnOfFour = checkColumn(39, 4);
      const isColumnOfThree = checkColumn(47, 3);
      const isRowOfFour = checkRow(4);
      const isRowOfThree = checkRow(3);
  
      if (tokenTargetedId && validMove && (isColumnOfFour || isColumnOfThree || isRowOfFour || isRowOfThree)){
        setTokenDraged(null);
        setTokenTargeted(null);
      } else {
        currentTokenDisplay[tokenTargetedId] = tokenTargeted.getAttribute('src');
        currentTokenDisplay[tokenDragedId] = tokenDraged.getAttribute('src');
        setCurrentTokenDisplay([...currentTokenDisplay]);
      }
    }
    };
  
    const boardGame = () => {
      const randomTokenDisplay = [];
      for (let i = 0; i < width * width; i++){
        const randomToken = characterTokens[Math.floor(Math.random() * characterTokens.length)];
        randomTokenDisplay.push(randomToken);
      }
      setCurrentTokenDisplay(randomTokenDisplay);
    };
  
    useEffect(() => {
      boardGame();
    }, []);
  
    useEffect(() => {
      const timer = setInterval(() => {
        checkColumn(39,4);
        checkRow(4);
        checkColumn(47,3);
        checkRow(3);
        movingIntoCaseBelow();
        setCurrentTokenDisplay([...currentTokenDisplay]);
      },100);
      return () => clearInterval(timer);
    }, [checkRow, checkColumn, movingIntoCaseBelow, currentTokenDisplay]);
  

    return (
        <div className="game">
            <Navigation />
            <Score score={finalScore} />
            <div className="game-board">
                {currentTokenDisplay.map((characterToken, index) => (
                <div className="case">
                    <img key={index} data-id={index} onDrop={dragDrop} onDragStart={dragStart} onDragEnd={dragEnd} draggable={true} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()} onDragLeave={(e) => e.preventDefault()} src={characterToken} alt={characterToken}/>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Game;