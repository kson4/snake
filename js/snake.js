import { TILE_X_SIZE, TILE_Y_SIZE, ctx } from "./script.js"
import { appleEaten } from "./apple.js"

export let headX = 10
export let headY = 11
let direction = [0, 0]
let snakeLength = 1
let snakeBody = [[10, 10]]

window.addEventListener("keydown", e => {
  // console.log(e)
  if (e.key == "ArrowUp")
    changeDirection("up")
  else if (e.key == "ArrowRight")
    changeDirection("right")
  else if (e.key == "ArrowDown")
    changeDirection("down")
  else if (e.key == "ArrowLeft")
    changeDirection("left")
  // drawSnake()
})

export function drawSnake() {
  // console.log(snakeLength)
  if (appleEaten())
    snakeLength++
  moveSnake()
  snakeBody.push([headX, headY])
  ctx.fillStyle = "green"
  ctx.fillRect(headX * TILE_X_SIZE, headY * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
}
export function removeSnakePart() {
  if (snakeLength < snakeBody.length) {
    let tail = snakeBody.shift()
    ctx.fillStyle = "black"
    ctx.fillRect(tail[0] * TILE_X_SIZE, tail[1] * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
  }
}
function changeDirection(direct) {
  if (direct === "up")
    direction = [0, -1]
  else if (direct === "right")
    direction = [1, 0]
  else if (direct === "down")
    direction = [0, 1]
  else if (direct === "left")
    direction = [-1, -0]
}
function moveSnake() {
  headX += direction[0]
  headY += direction[1]
}