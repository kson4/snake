export class Apple {
  constructor(xSize, ySize, ctx) {
    this.x = 0
    this.y = 0
    this.ctx = ctx
    this.xSize = xSize
    this.ySize = ySize
  }
  draw(rows, cols) {
    this.x = Math.floor(Math.random() * rows)
    this.y = Math.floor(Math.random() * cols)
    this.ctx.fillStyle = "red"
    this.ctx.fillRect(this.x * this.xSize, this.y * this.ySize, this.xSize, this.ySize)
  }
}