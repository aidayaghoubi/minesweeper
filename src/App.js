import React, { useEffect, useState } from 'react';
import "./index.css"

import { Flag, Bomb, Empty } from './BoxTypes';
import bombImg from './assets/bomb.png'
import flagImg from './assets/flag.png'

import checkAroundButton from './utils/checkAround';
import { checkBombCount } from './utils/checkBombCount';
import createRandomBombs from './utils/CreateBombs';
import { createArray } from './utils/createArray';

const rowCount = 10


const GridWithDragAndDrop = () => {
  const [bombs, setBombs] = useState(() => createRandomBombs())
  const [finishGame, setFinishGame] = useState(false)
  const [boxes, setBoxes] = useState({})
  const [flags, setFlags] = useState([])
  const [activeMode, setActiveMode] = useState("click")

  function handleClickOnButton(fx) {
    if (bombs.includes(fx)) {
      setFinishGame(true);
      window.alert("You lose the game :( Try again");
      resetGame();
    } else {
      checkBoxes(fx);
    }
  }

  function checkBoxes(startEl) {
    const boxQueue = [startEl];
    const updatedBoxes = {};

    while (boxQueue.length > 0) {
      const box = boxQueue.pop();
      if (!flags.includes(box) && !updatedBoxes.hasOwnProperty(box)) {
        const aroundButtons = checkAroundButton(box);
        const bombCount = checkBombCount(bombs, aroundButtons);
        updatedBoxes[box] = bombCount !== 0 ? bombCount : "empty";
        if (bombCount === 0) {
          aroundButtons.forEach(item => {
            if (!updatedBoxes.hasOwnProperty(item)) {
              boxQueue.push(item);
            }
          });
        }
      }
    }

    setBoxes(prev => ({ ...prev, ...updatedBoxes }));
  }

  function resetGame() {
    setTimeout(() => {
      setBombs(() => createRandomBombs())
      setBoxes({})
      setFlags([])
      setActiveMode("click")
      setFinishGame(false)
    }, [2500])
  }

  function addFlag(fx) {
    setFlags(prev => ([...prev, fx]))
  }

  function removeFlag(fx) {
    setFlags(prev => prev.filter(el => el !== fx))
  }


  useEffect(() => {
    if (Object.entries(boxes).length === 90) {
      window.alert("you win the game")
      setFinishGame(true)
      resetGame()
    }
  }, [boxes])

  return (
    <div className='container'>
      <div className='game'>
        <div className='controls'>
          <button className='activeMode' onClick={() => setActiveMode(activeMode === "click" ? "flag" : "click")}>
            <img src={activeMode === "click" ? bombImg : flagImg} alt='flag' />
          </button>
          <button className='reset' onClick={resetGame}>Reset</button>
          <h2>Flags:{flags.length}</h2>
        </div>
        <div>
          {createArray(rowCount).map((_, row) => {
            return <div className="Rows">{
              createArray(rowCount).map((_,column) => {
                const fx = `${row}-${column}`;
                if (!finishGame && flags.includes(fx)) {
                  return <Flag handleClick={() => removeFlag(fx)} />
                } else if (boxes[fx]) {
                  return <Empty value={boxes[fx]} />
                } else {
                  return <button className='icons' onClick={() => activeMode === "click" ? handleClickOnButton(fx) : addFlag(fx)}>
                    {finishGame && bombs.includes(fx) && <Bomb />}
                  </button>
                }
              })}
            </div>
          })}
        </div>
      </div>
    </div>
  );
};

export default GridWithDragAndDrop;
