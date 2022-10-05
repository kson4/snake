import { TILE_X_SIZE, TILE_Y_SIZE, ctx } from "./script.js"
import { appleEaten } from "./apple.js"

export let headX = 20
export let headY = 20
export let direction = [0, 0]
let snakeLength = 1
export let snakeBody = []

window.addEventListener("keydown", e => {
  if (e.key == "ArrowUp")
    changeDirection("up")
  else if (e.key == "ArrowRight")
    changeDirection("right")
  else if (e.key == "ArrowDown")
    changeDirection("down")
  else if (e.key == "ArrowLeft")
    changeDirection("left")
})

export function drawSnake() {
  console.log("DRAW")
  if (appleEaten())
    snakeLength++
  moveSnake()
  snakeBody.push([headX, headY])
  ctx.fillStyle = "green"
  ctx.fillRect(headX * TILE_X_SIZE, headY * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
}
export function removeSnakePart() {
  console.log("REMOVE")
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
export function moveSnake() {
  headX += direction[0]
  headY += direction[1]
}