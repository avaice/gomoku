import React, { useMemo, useState } from 'react'
import './App.css'
import { createBoard, judge } from './component/board'
import { Board } from './component/boardRenderer'

function App() {
  const [board, setBoard] = useState(createBoard(14))
  const [currentPlayer, setCurrentPlayer] = useState<boolean | undefined>(true)
  const [gameStatus, setGameStatus] = useState<boolean | 'draw' | undefined>()
  const statusText = useMemo(() => {
    if (gameStatus !== undefined) {
      if (gameStatus === 'draw') {
        return '引き分けです'
      }
      return (gameStatus ? 'Black' : 'White') + ' Win!'
    }
    return currentPlayer ? '黒色のターン！' : '白色のターン！'
  }, [currentPlayer])
  const place = (x: number, y: number) => {
    if (currentPlayer === undefined || board[y][x] !== undefined) {
      return
    }
    const newBoard = [...board]
    newBoard[y][x] = currentPlayer
    setBoard(newBoard)
    const result = judge(x, y, board, currentPlayer)
    if (result !== undefined) {
      setGameStatus(result)
      setCurrentPlayer(undefined)
      return
    }

    setCurrentPlayer(!currentPlayer)
  }
  return (
    <div className="App">
      <h1>ごもくならべ</h1>
      <p>{statusText}</p>
      <Board data={board} placeFunction={place} />
      {gameStatus && (
        <button
          onClick={() => {
            setBoard(createBoard(14))
            setCurrentPlayer(true)
            setGameStatus(undefined)
          }}
        >
          REPLAY
        </button>
      )}
    </div>
  )
}

export default App
