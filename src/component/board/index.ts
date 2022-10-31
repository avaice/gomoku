type CellType = boolean | undefined
export type BoardType = CellType[][]
type Judgement = true | false | 'draw' | undefined

export const createBoard = (num: number) => {
  const arr: BoardType = new Array()
  for (let x = 0; x < num; x++) {
    const col: CellType[] = new Array()
    for (let y = 0; y < num; y++) {
      col.push(undefined)
    }
    arr.push(col)
  }
  return arr
}

export const judge = (
  x: number,
  y: number,
  board: BoardType,
  currentPlayer: boolean
): Judgement => {
  const scan = (arr: CellType[]) => {
    let combo = 0

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === currentPlayer) {
        combo++
      } else {
        combo = 0
      }
      if (combo === 5) {
        return true
      }
    }

    return false
  }

  // Horizontal
  if (scan(board[y])) {
    return currentPlayer
  }

  // Vertical
  const col = board.map((i) => i[x])
  if (scan(col)) {
    return currentPlayer
  }

  // Diagonal
  const scanPos = { x: x - Math.min(x, y), y: y - Math.min(x, y) }
  const scanPos_reverse = {
    x: x - (board.length - y - 1),
    y: y + (board.length - y - 1),
  }
  const diagonal = []
  const diagonal_reverse = []
  while (true) {
    if (scanPos.x === board.length || scanPos.y === board.length) {
      break
    }
    diagonal.push(board[scanPos.y][scanPos.x])

    scanPos.x++
    scanPos.y++
  }
  while (true) {
    if (scanPos_reverse.x === board.length || scanPos_reverse.y === -1) {
      break
    }
    diagonal_reverse.push(board[scanPos_reverse.y][scanPos_reverse.x])

    scanPos_reverse.x++
    scanPos_reverse.y--
  }
  if (scan(diagonal) || scan(diagonal_reverse)) {
    return currentPlayer
  }

  // Draw
  const cellCount = board.length * board[0].length
  let totalCellCount = 0
  board.forEach((col) => {
    col.forEach((cell) => {
      if (cell !== undefined) {
        totalCellCount++
      }
    })
  })
  if (cellCount === totalCellCount) {
    return 'draw'
  }

  // Not settled
  return undefined
}
