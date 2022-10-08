import { Snake, snake } from "./snake.js"
import { Apple, apple } from "./apple.js"
import { startSimple } from "./algorithms.js"
import { TILE_X_SIZE, TILE_Y_SIZE, ctx, board } from "./board.js"

board.getAvailableSpots(snake.body)
board.fillEmptySpots(snake.body)
snake.draw(board.availableSpots)
apple.draw(board.availableSpots)
await startSimple()

board.getAvailableSpots(snake.body)

// board.fillEmptySpots(snake.body)

ctx.fillStyle="yellow"
const toArray = Array.from(board.availableSpots)
for (let i = 0; i < toArray.length; i++) {
  for (let j = 0; j < snake.body.length; i++) {
    console.log([snake.body[j][0], snake.body[j][1]])
    console.log(toArray)
    if (toArray.includes([snake.body[j][0], snake.body[j][1]]))
      console.log("SKIPPED")
    else {
      ctx.fillRect(toArray[i][0] * board.rSize, toArray[i][1] * board.cSize, board.rSize, board.cSize)
    }
  }
}

// await startSimple()

// export const GAME_WIDTH = 1000
// export const GAME_HEIGHT = 1000
// export const ROWS = 50
// export const COLS = 50
// export const TILE_X_SIZE = GAME_WIDTH / ROWS
// export const TILE_Y_SIZE = GAME_HEIGHT / COLS

// const gameBoard = document.querySelector(".game-board")
// gameBoard.width = GAME_WIDTH
// gameBoard.height = GAME_HEIGHT
// export const ctx = gameBoard.getContext("2d")
// ctx.fillStyle = "black"
// ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)


// export const snake = new Snake(TILE_X_SIZE, TILE_Y_SIZE)
// snake.draw(board.availableSpots)
// export const apple = new Apple(TILE_X_SIZE, TILE_Y_SIZE, ctx)

// export let availableSpots = new Set()
// for (let i = 0; i < ROWS; i++) {
//   for (let j = 0; j < COLS; j++) {
//     availableSpots.add(i + " " + j)
//   }
// }

// window.addEventListener("keydown", e => {
//   if (e.key == "ArrowUp")
//     snake.changeDirection("up")
//   else if (e.key == "ArrowRight")
//     snake.changeDirection("right")
//   else if (e.key == "ArrowDown")
//     snake.changeDirection("down")
//   else if (e.key == "ArrowLeft")
//     snake.changeDirection("left")
// })

// let runGame = true
// let idx = 0
// console.log(snake.x, snake.y, apple.x, apple.y)
// while (runGame) {
//   if (idx === 1000) {
//     runGame = false
//   }
//   console.log(1)
//   await startSimple()
//   console.log(2)
//   ctx.fillStyle = "black"
//   ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
//   // apple.getAvailableSpots()
//   apple.draw(ROWS, COLS, snake.body)
  
//   idx++
// }