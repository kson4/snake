import { TILE_X_SIZE, TILE_Y_SIZE, ctx, board } from "./board.js"

export class Snake {
  constructor(xSize, ySize) {
    this.x = 8
    this.y = 5
    this.direction = [0, 0]
    this.length = 1
    this.body = []
    this.xSize = xSize
    this.ySize = ySize
  }
  draw(availableSpots) {
    this.body.push([this.x, this.y])
    availableSpots.add([this.x, this.y])
    ctx.fillStyle = "green"
    ctx.fillRect(this.x * this.xSize, this.y * this.ySize, this.xSize, this.ySize)
    if (this.length < this.body.length) {
      let tail = this.body.shift()
      ctx.fillStyle = "black"
      ctx.fillRect(tail[0] * this.xSize, tail[1] * this.ySize, this.xSize, this.ySize)
      availableSpots.delete([tail[0], tail[1]])
    }
  }
  move() {
    this.x += this.direction[0]
    this.y += this.direction[1]
  }
  changeDirection(direction) {
    if (direction === "up")
      this.direction = [0, -1]
    else if (direction === "right")
      this.direction = [1, 0]
    else if (direction === "down")
      this.direction = [0, 1]
    else if (direction === "left")
      this.direction = [-1, -0]
  }
  increaseLength(availableSpots) {
    this.length++
    let tailX = this.x - this.direction[0]
    let tailY = this.y - this.direction[1]
    this.body.push([tailX, tailY])
    availableSpots.add([tailX, tailY])
    ctx.fillStyle = "green"
    ctx.fillRect(tailX * this.xSize, tailY * this.ySize, this.xSize, this.ySize)
  }
}

export const snake = new Snake(TILE_X_SIZE, TILE_Y_SIZE)