export class Apple {
  constructor(xSize, ySize, ctx) {
    this.x = 0
    this.y = 0
    this.ctx = ctx
    this.xSize = xSize
    this.ySize = ySize
    this.spots = []
  }
  draw(rows, cols, snakeBody) {
    console.log("looking")
    this.getAvailableSpots(rows, cols, snakeBody)
    console.log("finished looking")
    let spot = this.spots[Math.floor(Math.random() * this.spots.length)].split(" ")
    this.x = spot[0]
    this.y = spot[1]
    this.ctx.fillStyle = "red"
    this.ctx.fillRect(this.x * this.xSize, this.y * this.ySize, this.xSize, this.ySize)
  }
  getAvailableSpots(rows, cols, snakeBody) {
    console.log(snakeBody.length)
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.spots.push(i + " " + j)
      }
    }
    for (let i = 0; i < snakeBody.length; i++) {
      this.spots.splice(this.spots.indexOf(snakeBody[i][0] + " " + snakeBody[i][1]), 1)
    }
    console.log("still looking")
  }
}