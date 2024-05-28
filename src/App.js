import React, { useEffect, useState } from 'react';
import "./index.css"
import CreateButton from './CreateButtons';
import checkAroundButton from './checkAround';
import { checkBombCount } from './checkBombCount';
import bomb from './assets/bomb.png'
import flag from './assets/flag.png'
import Flag from './Flag';
import Empty from './Empty';
import Bomb from './Bomb';

const gameCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


const GridWithDragAndDrop = () => {
  const [bombs, setBombs] = useState(CreateButton())
  const [finishGame, setFinishGame] = useState(false)
  const [boxes, setBoxes] = useState({})
  const [flags, setFlags] = useState([])
  const [activeMode, setActiveMode] = useState("click")


  function last(el) {
    if (!flags.includes(el)) {
      const aroundButtons = checkAroundButton(el)
      const bombCount = checkBombCount(bombs, aroundButtons)
      if (bombCount !== 0) {
        setBoxes(prev => ({ ...prev, [el]: bombCount }))
      } else {
        setBoxes(prev => ({ ...prev, [el]: "empty" }))
        aroundButtons.forEach(item => finalStep(item))
      }
    }
  }

  function finalStep(el) {
    if (!flags.includes(el)) {
      const aroundButtons = checkAroundButton(el)
      const bombCount = checkBombCount(bombs, aroundButtons)
      if (bombCount !== 0) {
        setBoxes(prev => ({ ...prev, [el]: bombCount }))
      } else {
        setBoxes(prev => ({ ...prev, [el]: "empty" }))
      }
    }
  }

  function firstSearch(el) {
    if (!flags.includes(el)) {
      const aroundButtons = checkAroundButton(el)
      const bombCount = checkBombCount(bombs, aroundButtons)
      if (bombCount !== 0) {
        setBoxes(prev => ({ ...prev, [el]: bombCount }))
      } else {
        setBoxes(prev => ({ ...prev, [el]: "empty" }))
        aroundButtons.forEach(item => secondSearch(item))
      }
    }
  }

  function secondSearch(el) {
    if (!flags.includes(el)) {
      const aroundButtons = checkAroundButton(el)
      const bombCount = checkBombCount(bombs, aroundButtons)
      if (bombCount !== 0) {
        setBoxes(prev => ({ ...prev, [el]: bombCount }))
      } else {
        setBoxes(prev => ({ ...prev, [el]: "empty" }))
        aroundButtons.forEach(bb => last(bb))
      }
    }
  }

  function resetGame() {
    setTimeout(() => {
      setBombs(CreateButton())
      setBoxes({})
      setFlags([])
      setActiveMode("click")
      setFinishGame(false)
    }, [3000])
  }

  function handleClickOnButton(fx) {
    if (flags.includes(fx) && activeMode === "flag") {
      setFlags(prev => prev.filter(el => el !== fx))
    } else if (!flags.includes(fx) && !boxes[fx]) {
      if (activeMode === "flag") {
        setFlags(prev => ([...prev, fx]))
      } else if (bombs.includes(fx)) {
        setFinishGame(true)
        window.alert("you lose the game :( try again")
        resetGame()
      } else {
        const aroundButtons = checkAroundButton(fx)
        const bombCount = checkBombCount(bombs, aroundButtons)
        if (bombCount !== 0) {
          setBoxes(prev => ({ ...prev, [fx]: bombCount }))
        } else {
          setBoxes(prev => ({ ...prev, [fx]: "empty" }))
          aroundButtons.forEach(el => {
            const aroundButtons = checkAroundButton(el)
            const bombCount = checkBombCount(bombs, aroundButtons)
            if (!flags.includes(el)) {
              if (bombCount !== 0) {
                setBoxes(prev => ({ ...prev, [el]: bombCount }))
              } else {
                setBoxes(prev => ({ ...prev, [el]: "empty" }))
                aroundButtons.forEach(el => {
                  firstSearch(el)
                })
              }
            }
          })
        }
      }
    }
  }

  useEffect(() => {
    if (Object.entries(boxes).length === 90) {
      window.alert("you win the game")
      setFinishGame(true)
      resetGame()
    }
  }, [boxes])

  console.log(Object.entries(boxes).length, "dd");
  return (
    <div className='container'>
      <div className='game'>
        <div className='header'>
          <button className='activeMode' onClick={() => setActiveMode(activeMode === "click" ? "flag" : "click")}>
            <img src={activeMode === "click" ? bomb : flag} />
          </button>
          <button className='reset' onClick={resetGame}>Reset</button>
          <h2>Flags:{flags.length}</h2>
        </div>
        <div>
          {gameCount.map(row => {
            return <div className="Rows">{
              gameCount.map(column => {
                if ((!finishGame && bombs.includes(`${row}-${column}`)) && flags.includes(`${row}-${column}`)) {
                  return <Flag handleClick={() => handleClickOnButton(`${row}-${column}`)} />
                } else if (boxes[`${row}-${column}`]) {
                  return <Empty value={boxes[`${row}-${column}`]} />
                } else {
                  return <button className='icons' onClick={() => handleClickOnButton(`${row}-${column}`)}>
                    {finishGame && bombs.includes(`${row}-${column}`) && <Bomb />}
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
