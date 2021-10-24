import { useEffect, useState } from "react";

function App() {

  const width = 8;
  const characterTokens =['batman', 'superman', 'aquaman', 'wonder-woman', 'flash', 'cyborg'];
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
      
    </div>
  );
}

export default App;
