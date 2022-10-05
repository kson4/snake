import { drawApple } from "./apple.js"
import { TILE_X_SIZE, TILE_Y_SIZE, ctx, ROWS, COLS } from "./script.js"

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
let appleX
let appleY
let headX
let headY

export function initializeSimple(_headX, _headY, _appleX, _appleY) {
  appleX = _appleX
  appleY = _appleY
  headX = _headX
  headY = _headY
  console.log(calcSimple(headX, headY, appleX, appleY))
  pq.enqueue([headX, headY], calcSimple(headX, headY, appleX, appleY))
  ctx.fillStyle = "red"
  simple()
}
function calcSimple(headX, headY, appleX, appleY) {
  return Math.sqrt(Math.pow(headX - appleX, 2) + Math.pow(headY - appleY, 2))
}
function simple() {
  let cur = pq.dequeue()
  let x = cur[0][0]
  let y = cur[0][1]
  let dist = cur[1]
  ctx.fillStyle = "red"
  ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
  if (x === appleX && y === appleY) {
    console.log("FOUND")
    return
  }
  closed.add(x + " " + y)
  let neighbors = availableCells(x, y)
  neighbors.forEach((neighbor) => {
    ctx.fillStyle = "gray"
    ctx.fillRect(neighbor[0] * TILE_X_SIZE, neighbor[1] * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    pq.enqueue(neighbor, calcSimple(neighbor[0], neighbor[1], appleX, appleY))
  })
  ctx.fillStyle = "red"
  ctx.fillRect(appleX * TILE_X_SIZE, appleY * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
  setTimeout(() => {
    ctx.fillStyle = "gray"
    ctx.fillRect(x * TILE_X_SIZE, y * TILE_Y_SIZE, TILE_X_SIZE, TILE_Y_SIZE)
    if (pq.length() > 0) {
      simple()
    }
  }, 100)
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