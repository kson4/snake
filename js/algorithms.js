import { TILE_X_SIZE, TILE_Y_SIZE, ctx, ROWS, COLS, GAME_HEIGHT, GAME_WIDTH, snake, apple } from "./script.js"

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

export async function startSimple() {
  pq = new PriorityQueue()
  pq.enqueue([snake.x, snake.y], calcSimple())
  await simple()
  await displayPath(0, simplePath)
  await travelPath()
  snake.increaseLength()
  // await reset(0)
}
function calcSimple(headX, headY, appleX, appleY) {
  return Math.sqrt(Math.pow(headX - apple.x, 2) + Math.pow(headY - apple.y, 2))
}

export function simple() {
  return new Promise((res) => {
    let cur = pq.dequeue()
    let x = cur[0][0]
    let y = cur[0][1]
    let dist = cur[1]
    simplePath.push([x, y])
    closed.add(x + " " + y)
    let neighbors = availableCells(x, y)
    neighbors.forEach((neighbor) => {
      ctx.fillStyle = "gray"
      ctx.fillRect(neighbor[0] * TILE_X_SIZE, neighbor[1] * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
      pq.enqueue(neighbor, calcSimple(neighbor[0], neighbor[1]))
    })
    ctx.fillStyle = "gray"
    ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    ctx.fillStyle = "red"
    ctx.fillRect(apple.x * TILE_X_SIZE, apple.y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    ctx.fillStyle = "green"
    for (let i = 0; i < snake.body.length; i++) {
      ctx.fillRect(snake.body[i][0] * TILE_X_SIZE, snake.body[i][1] * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    }
    
    setTimeout(() => {
      if (!(x === apple.x && y === apple.y)) {
        res(simple())
      }
      else {
        res()
      }
    }, 25)
  })
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
  // console.log(snake.body)
  return new Promise((res) => {
    ctx.fillStyle = "red"
    // if (idx < snake.length)
    //   res(displayPath(idx + 1, path))
    let x = path[idx][0]
    let y = path[idx][1]
    if (snake.body.includes([x, y])) {
      console.log(x, y)
    }
    ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
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
    // direction[0] = simplePath[1][0] - simplePath[0][0]
    // direction[1] = simplePath[1][1] - simplePath[0][1]
    // simplePath.shift()
    // snake.x += direction[0]
    // snake.y += direction[1]
    // snake.x += simplePath[1][0] - simplePath[0][0]
    // snake.y += simplePath[1][1] - simplePath[0][1]
    
    snake.direction = [simplePath[1][0] - simplePath[0][0], simplePath[1][1] - simplePath[0][1]]
    snake.x += simplePath[1][0] - simplePath[0][0]
    snake.y += simplePath[1][1] - simplePath[0][1]
    simplePath.shift()
    snake.draw()
    setTimeout(() => {
      if (simplePath.length > 1) {
        res(travelPath())
      }
      else {
        res()
      }
    }, 50)
  })
}

function reset(idx) {
  return new Promise((res) => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    // if (idx < snake.body.length) {
    //   pq.dequeue()
    //   res(reset(idx + 1))
    // }
    // if (pq.length() > 0) {
    //   let cur = pq.dequeue()
    //   let x = cur[0][0]
    //   let y = cur[0][1]
    //   if (!snake.body.includes([x, y])) {
    //     ctx.fillStyle = "black"
    //     ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    //   }
    //   res(reset(idx + 1))
    // }
    // res()
  })
}