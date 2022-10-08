export const GAME_WIDTH = 1000
export const GAME_HEIGHT = 1000
export const ROWS = 20
export const COLS = 20
export const TILE_X_SIZE = GAME_WIDTH / ROWS
export const TILE_Y_SIZE = GAME_HEIGHT / COLS

export class Board {
  constructor(rows, cols, width, height, rSize, cSize) {
    this.rows = rows
    this.cols = cols
    this.width = width
    this.height = height
    this.rSize = rSize
    this.cSize = cSize
    this.availableSpots = new Set()
  }
  getAvailableSpots(snakeBody) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.availableSpots.add([i, j])
      }
    }
    for (let i = 0; i < snakeBody.length; i++) {
      console.log(`[${snakeBody[i][0]}, ${snakeBody[i][1]}]`)
      this.availableSpots.delete(`[${snakeBody[i][0]}, ${snakeBody[i][1]}]`)
    }
  }
  fillEmptySpots(snakeBody, color) {
    console.log(snakeBody)
    ctx.fillStyle = color
    const toArray = Array.from(this.availableSpots)
    for (let i = 0; i < toArray.length; i++) {
      ctx.fillRect(toArray[i][0] * this.rSize, toArray[i][1] * this.cSize, this.rSize, this.cSize)
    }
  }
}

export const board = new Board(ROWS, COLS, GAME_WIDTH, GAME_HEIGHT, TILE_X_SIZE, TILE_Y_SIZE)

const gameBoard = document.querySelector(".game-board")
gameBoard.width = GAME_WIDTH
gameBoard.height = GAME_HEIGHT
export const ctx = gameBoard.getContext("2d")
ctx.fillStyle = "black"
ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)