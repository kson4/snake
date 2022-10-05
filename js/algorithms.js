import { drawApple } from "./apple.js"
import { TILE_X_SIZE, TILE_Y_SIZE, ctx, ROWS, COLS, GAME_HEIGHT, GAME_WIDTH } from "./script.js"
import { drawSnake, direction, removeSnakePart, snakeBody } from "./snake.js"

class PriorityQueue {
  constructor() {
    this.collection = []
  }
  enqueue(cell, priority) {
    const element = [cell, priority]
    
    if (this.collection.length === 0)
      this.collection.push(element)
    else if (this.collection[this.collection.length - 1][1] < priority)
      this.collection.push(element)
    else {
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i][1] > priority) {
          this.collection.splice(i, 0, element)
          break
        }
      }
    }
  }
  dequeue() {
    return this.collection.shift()
  }
  peek() {
    return this.collection[0]
  }
  length() {
    return this.collection.length
  }
}
let pq = new PriorityQueue()
let closed = new Set()
let simplePath = []
let appleX
let appleY
let headX
let headY

export async function initializeSimple(_headX, _headY, _appleX, _appleY) {
  console.log("WTF")
  appleX = _appleX
  appleY = _appleY
  headX = _headX
  headY = _headY
  pq.enqueue([headX, headY], calcSimple(headX, headY, appleX, appleY))
  ctx.fillStyle = "red"

  await simple()
  await displayPath(0, simplePath)
  await test(0)
  // await 
  console.log(simplePath)
  await travelPath()
  await reset()

  // simple()
  //   .then(() => {
  //     console.log("simple is done")
  //     displayPath(0, simplePath).then(console.log("check"))
  //       // .then(travelPath)
  //   })
}
function calcSimple(headX, headY, appleX, appleY) {
  return Math.sqrt(Math.pow(headX - appleX, 2) + Math.pow(headY - appleY, 2))
}

function test(i) {
  return new Promise((res) => {
    if (i < 10) {
      console.log(i)
      setTimeout(() => {
        res(test(i + 1))
      }, 50)
    }
    else {
      res()
    }
  })
}

function test2() {
  console.log("initial is done")
}


function simple() {
  return new Promise((res) => {
    let cur = pq.dequeue()
    let x = cur[0][0]
    let y = cur[0][1]
    let dist = cur[1]
    simplePath.push([x,y])
    ctx.fillStyle = "red"
    ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    
    closed.add(x + " " + y)
    let neighbors = availableCells(x, y)
    neighbors.forEach((neighbor) => {
      ctx.fillStyle = "gray"
      ctx.fillRect(neighbor[0] * TILE_X_SIZE, neighbor[1] * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
      pq.enqueue(neighbor, calcSimple(neighbor[0], neighbor[1], appleX, appleY))
    })
    ctx.fillStyle = "red"
    ctx.fillRect(appleX * TILE_X_SIZE, appleY * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)

    ctx.fillStyle = "gray"
    ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    
    setTimeout(() => {
      if (x !== appleX && y !== appleY) {
        res(simple())
      }
      else {
        res()
      }
    }, 50)
  })


  // let cur = pq.dequeue()
  // let x = cur[0][0]
  // let y = cur[0][1]
  // let dist = cur[1]
  // simplePath.push([x,y])
  // ctx.fillStyle = "red"
  // ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
  // if (x === appleX && y === appleY) {
  //   console.log("FOUND")
  //   return new Promise((res) => {
  //     displayPath(0, simplePath)
  //     .then(reset(0))
  //     .then(travelPath())
  //     res()
  //   })
    
  // }
  // closed.add(x + " " + y)
  // let neighbors = availableCells(x, y)
  // neighbors.forEach((neighbor) => {
  //   ctx.fillStyle = "gray"
  //   ctx.fillRect(neighbor[0] * TILE_X_SIZE, neighbor[1] * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
  //   pq.enqueue(neighbor, calcSimple(neighbor[0], neighbor[1], appleX, appleY))
  // })
  // ctx.fillStyle = "red"
  // ctx.fillRect(appleX * TILE_X_SIZE, appleY * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
  // setTimeout(() => {
  //   ctx.fillStyle = "gray"
  //   ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
  //   if (pq.length() > 0) {
  //     simple()
  //   }
  // }, 100)
}

function availableCells(x, y) {
  let neighbors = []
  if (x - 1 >= 0)
    neighbors.push([x - 1, y])
  if (x + 1 < ROWS)
    neighbors.push([x + 1, y])
  if (y - 1 >= 0)
    neighbors.push([x, y - 1])
  if (y + 1 < COLS)
    neighbors.push([x, y + 1])
  return neighbors
}

function displayPath(idx, path) {
  console.log(idx)
  return new Promise((res) => {
    ctx.fillStyle = "red"
    ctx.fillRect(path[idx][0] * TILE_X_SIZE, path[idx][1] * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    setTimeout(() => {
      if (idx + 1 < path.length) {
        res(displayPath(idx + 1, path))
      }
      else {
        res()
      }
    }, 10)
  })
}

function travelPath() {
  return new Promise((res) => {
    
    direction[0] = simplePath[1][0] - simplePath[0][0]
    direction[1] = simplePath[1][1] - simplePath[0][1]
    headX += direction[0]
    headY += direction[1]
    simplePath.shift()
    drawSnake()
    removeSnakePart()

    setTimeout(() => {
      if (simplePath.length > 1) {
        res(travelPath())
      }
      else {
        direction[0] = appleX - simplePath[0][0]
        direction[1] = appleY - simplePath[0][1]
        headX += direction[0]
        headY += direction[1]
        simplePath.shift()
        drawSnake()
        removeSnakePart()
        res()
      }
    }, 50)

  })
}

function reset(idx) {
  
  console.log(closed)
}