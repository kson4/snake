import { TILE_X_SIZE, TILE_Y_SIZE, ctx } from "./script.js"
import { headX, headY } from "./snake.js"

let appleX
let appleY
let renderedApple = false

export function drawApple() {
  if (!renderedApple) {
    appleX = Math.floor(Math.random() * TILE_X_SIZE)
    appleY = Math.floor(Math.random() * TILE_Y_SIZE)
    ctx.fillStyle = "red"
    ctx.fillRect(appleX * TILE_X_SIZE, appleY * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
  }
  renderedApple = true
}

export function appleEaten() {
  console.log(appleX, headX, appleY, headY)
  if (appleX === headX && appleY === headY) {
    // snakeLength++
    renderedApple = false
    // snakeLength
    return true
  }
  // console.log(snakeLength)
  return false
}