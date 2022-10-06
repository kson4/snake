import { ctx } from "./script.js"

export class Snake {
  constructor(xSize, ySize) {
    this.x = 10
    this.y = 10
    this.direction = [0, 0]
    this.length = 1
    this.body = []
    this.xSize = xSize
    this.ySize = ySize
  }
  draw() {
    this.body.push([this.x, this.y])
    ctx.fillStyle = "green"
    ctx.fillRect(this.x * this.xSize, this.y * this.ySize, this.xSize, this.ySize)
    if (this.length < this.body.length) {
      let tail = this.body.shift()
      ctx.fillStyle = "black"
      ctx.fillRect(tail[0] * this.xSize, tail[1] * this.ySize, this.xSize, this.ySize)
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
  increaseLength() {
    this.length++
    let tailX = this.x - this.direction[0]
    let tailY = this.y - this.direction[1]
    console.log(this.x, this.y, tailX, tailY)
    this.body.push([tailX, tailY])
    ctx.fillStyle = "green"
    ctx.fillRect(tailX * this.xSize, tailY * this.ySize, this.xSize, this.ySize)
  }
}