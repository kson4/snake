import { drawSnake, removeSnakePart } from "./snake.js"
const GAME_WIDTH = 500
const GAME_HEIGHT = 500
const ROWS = 50
const COLS = 50
export const TILE_X_SIZE = GAME_WIDTH / ROWS
export const TILE_Y_SIZE = GAME_HEIGHT / COLS
const SPEED = 10
let lastRenderTime = 0

const gameBoard = document.querySelector(".game-board")
gameBoard.width = GAME_WIDTH
gameBoard.height = GAME_HEIGHT
export const ctx = gameBoard.getContext("2d")
ctx.fillStyle = "black"
ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

function main(currentTime) {
  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SPEED) return
  lastRenderTime = currentTime
  drawSnake()
  removeSnakePart()
}

function initializeBoard() {
  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div")
    row.classList.add(`r${i}`)
    row.classList.add("row")
    for (let j = 0; j < COLS; j++) {
      const cell = document.createElement("div")
      cell.classList.add(`r${i}c${j}`)
      cell.classList.add("cell")
      row.append(cell)
    }
    gameBoard.append(row)
  }
}

// initializeBoard()
window.requestAnimationFrame(main)