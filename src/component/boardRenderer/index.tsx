import { BoardType, createBoard } from '../board'
import styles from './style.module.css'

export const Board = (props: {
  data: BoardType
  placeFunction: (x: number, y: number) => void
}) => {
  const drawBoardArr = createBoard(13)

  return (
    <div className={styles.board}>
      {drawBoardArr.map((col, y) =>
        col.map((_cell, x) => (
          <div
            className={styles.cell}
            style={{
              top: `${25 * y + 12}px`,
              left: `${25 * x + 12}px`,
            }}
            key={`${x}_${y}`}
          ></div>
        ))
      )}

      {props.data.map((col, y) =>
        col.map((cell, x) => (
          <div
            className={`${styles.clickArea} ${
              cell !== undefined ? (cell ? styles.true : styles.false) : ''
            }`}
            style={{ top: `${25 * y - 3}px`, left: `${25 * x}px` }}
            key={`clickArea_${x}_${y}`}
            onClick={() => props.placeFunction(x, y)}
          ></div>
        ))
      )}
    </div>
  )
}
