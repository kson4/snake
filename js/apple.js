import { TILE_X_SIZE, TILE_Y_SIZE, ctx } from "./board.js"

export class Apple {
  constructor(xSize, ySize, ctx) {
    this.x = 0
    this.y = 0
    this.ctx = ctx
    this.xSize = xSize
    this.ySize = ySize
  }
  draw(availableSpots) {
    const toArray = Array.from(availableSpots)
    let spot = toArray[Math.floor(Math.random() * toArray.length)]
    this.x = spot[0]
    this.y = spot[1]
    this.ctx.fillStyle = "red"
    this.ctx.fillRect(this.x * this.xSize, this.y * this.ySize, this.xSize, this.ySize)
  }
  // draw(rows, cols, snakeBody) {
  //   console.log("looking")

  //   // this.getAvailableSpots(rows, cols, snakeBody)
  //   // console.log("finished looking")
  //   let spot = this.spots[Math.floor(Math.random() * this.spots.length)].split(" ")
  //   this.x = spot[0]
  //   this.y = spot[1]
  //   this.ctx.fillStyle = "red"
  //   this.ctx.fillRect(this.x * this.xSize, this.y * this.ySize, this.xSize, this.ySize)
  // }
  // getAvailableSpots(rows, cols, snakeBody) {
  //   console.log(snakeBody.length)
  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       this.spots.push(i + " " + j)
  //     }
  //   }
  //   for (let i = 0; i < snakeBody.length; i++) {
  //     this.spots.splice(this.spots.indexOf(snakeBody[i][0] + " " + snakeBody[i][1]), 1)
  //   }
  //   console.log("still looking")
  // }
}

export const apple = new Apple(TILE_X_SIZE, TILE_Y_SIZE, ctx)