import { useEffect, useState } from "react";
import batman from './tokens/batman.png';
import superman from './tokens/superman.png';
import aquaman from './tokens/aquaman.png';
import wonderWoman from './tokens/wonder-woman.png';
import flash from './tokens/flash.png';
import cyborg from './tokens/cyborg.png';

function App() {

  const width = 8;
  const characterTokens =[batman, superman, aquaman, wonderWoman, flash, cyborg];
  const[currentTokenDisplay, setCurrentTokenDisplay] =useState([]);

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

  return (
    <div className="App">
      <div className="game-board">
        {currentTokenDisplay.map((characterToken, index) => (
          <div className="case">
            <img key={index} src={characterToken} alt={characterToken}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
