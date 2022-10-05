import { ctx, ROWS, COLS, TILE_X_SIZE, TILE_Y_SIZE } from "./script.js"
import { headX, headY } from "./snake.js"

// const TILE_X_SIZE = 10
// const TILE_Y_SIZE = 10

const _ROWS = 50
const _COLS = 50

export let appleX = Math.floor(Math.random() * _ROWS)
export let appleY = Math.floor(Math.random() * _COLS)
// export let appleX = 20
// export let appleY = 20
let renderedApple = false

export function drawApple() {
  if (!renderedApple) {
    appleX = Math.floor(Math.random() * _ROWS)
    appleY = Math.floor(Math.random() * _COLS)
    ctx.fillStyle = "red"
    ctx.fillRect(appleX * TILE_X_SIZE, appleY * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    renderedApple = true
    return [appleX, appleY]
  }
}

export function appleEaten() {
  if (appleX === headX && appleY === headY) {
    renderedApple = false
    return true
  }
  return false
}