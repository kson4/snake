import { Snake } from "./snake.js"
import { Apple } from "./apple.js"
import { startSimple } from "./algorithms.js"

export const GAME_WIDTH = 500
export const GAME_HEIGHT = 500
export const ROWS = 50
export const COLS = 50
export const TILE_X_SIZE = GAME_WIDTH / ROWS
export const TILE_Y_SIZE = GAME_HEIGHT / COLS

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

export const apple = new Apple(TILE_X_SIZE, TILE_Y_SIZE, ctx)
apple.draw(ROWS, COLS)
console.log(apple.x, apple.y)
export const snake = new Snake(TILE_X_SIZE, TILE_Y_SIZE)
snake.draw()
window.addEventListener("keydown", e => {
  if (e.key == "ArrowUp")
    snake.changeDirection("up")
  else if (e.key == "ArrowRight")
    snake.changeDirection("right")
  else if (e.key == "ArrowDown")
    snake.changeDirection("down")
  else if (e.key == "ArrowLeft")
    snake.changeDirection("left")
})

let runGame = true
let idx = 0
console.log(snake.x, snake.y, apple.x, apple.y)
while (runGame) {
  if (idx === 100) {
    runGame = false
  }
  await startSimple()
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  apple.draw(ROWS, COLS)
  idx++
}