import { drawSnake, removeSnakePart, headX, headY } from "./snake.js"
import { drawApple, appleX, appleY } from "./apple.js"
import { initializeSimple } from "./algorithms.js"

export const GAME_WIDTH = 500
export const GAME_HEIGHT = 500
export const ROWS = 50
export const COLS = 50
export const TILE_X_SIZE = GAME_WIDTH / ROWS
export const TILE_Y_SIZE = GAME_HEIGHT / COLS
const SPEED = 10
let lastRenderTime = 0

export function getTileX() {
  return TILE_X_SIZE
}
export function getTileY() {
  return TILE_Y_SIZE
}

const gameBoard = document.querySelector(".game-board")
gameBoard.width = GAME_WIDTH
gameBoard.height = GAME_HEIGHT
export const ctx = gameBoard.getContext("2d")

ctx.fillStyle = "black"
ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
let start = false

let runGame = true

let idx = 0
while (runGame) {
  if (idx = 3) {
    runGame = false
  }
  drawSnake()
  drawApple()
  initializeSimple(headX, headY, appleX, appleY)
}