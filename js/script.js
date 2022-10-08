import { Snake } from "./snake.js"
import { Apple } from "./apple.js"
import { startSimple } from "./algorithms.js"

export const GAME_WIDTH = 1000
export const GAME_HEIGHT = 1000
export const ROWS = 50
export const COLS = 50
export const TILE_X_SIZE = GAME_WIDTH / ROWS
export const TILE_Y_SIZE = GAME_HEIGHT / COLS

const gameBoard = document.querySelector(".game-board")
gameBoard.width = GAME_WIDTH
gameBoard.height = GAME_HEIGHT
export const ctx = gameBoard.getContext("2d")
ctx.fillStyle = "black"
ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)


export const snake = new Snake(TILE_X_SIZE, TILE_Y_SIZE)
snake.draw()
export const apple = new Apple(TILE_X_SIZE, TILE_Y_SIZE, ctx)
// apple.getAvailableSpots(ROWS, COLS, snake.body)
// apple.draw()

let availableSpots = []
for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    availableSpots.push(i + " " + j)
  }
}

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
  if (idx === 1000) {
    runGame = false
  }
  console.log(1)
  await startSimple()
  console.log(2)
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  // apple.getAvailableSpots()
  apple.draw(ROWS, COLS, snake.body)
  
  idx++
}