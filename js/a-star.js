import { board, snake, apple } from "./test.js"

class PriorityQueue {
  constructor() {
    this.collection = []
  }
  enqueue(f, g, h, x, y) {
    if (this.collection.length === 0) {
      this.collection.push([f, g, h, x, y])
    }
    else if (this.collection[this.collection.length - 1][0] < f) {
      this.collection.push([f, g, h, x, y])
    }
    else {
      let idx = 0
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i][0] > f) {
          idx = i
        }
        else if (idx != 0) {
          if (this.collection[i][2] > h) {
            idx++
          }
          else {
            break
          }
        }
      }
      this.collection.splice(idx, 0, [f, g, h, x, y])
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

const open = new PriorityQueue()
open.enqueue([[aStarCalc(snake.x, snake.y, apple.x, apple.y) + 0, 
  aStarCalc(snake.x, snake.y, apple.x,  apple.y), 0, snake.x, snake.y]])
// const open = [[aStarCalc(snake.x, snake.y, apple.x, apple.y) + 0, 
//   aStarCalc(snake.x, snake.y, apple.x,  apple.y), 0, snake.x, snake.y]]

const openSet = new Set()
const closedSet = new Set()
// aStar()
export function aStar() {
  const cell = open.dequeue()
  let f = cell[0]
  let g = cell[1]
  let h = cell[2]
  let x = cell[3]
  let y = cell[4]
  console.log(x, y, f)
  console.log(open)
  document.querySelector(`#r${x}c${y}`).classList.add("traveled")
  if (x == apple.x && y == apple.y) {
    console.log("FOUND")
    return
  }
  openSet.add(`${x} ${y}`)
  closedSet.add(`${x} ${y}`)

  let neighbors = getNeighbors(x, y)
  // console.log(neighbors)
  // console.log("neighbors: ", neighbors)
  for (let i = 0; i < neighbors.length; i++) {
    let nx = neighbors[i][0]
    let ny = neighbors[i][1]
    const ng = aStarCalc(nx, ny, snake.x, snake.y)
    const nh = aStarCalc(nx, ny, apple.x, apple.y)
    const nf = ng + nh
    if (openSet.has(nx + " " + ny)) {
      for (let j = 0; j < open.length; j++) {
        if (open[j][1] == x && open[j][2] == y) {
          if (open[j][0] > nf) {
            open[j][0] = nf
            open[j][1] = ng
            open[j][2] = nh
            return
          }
        }
      }
    }
    else {
      open.enqueue([nf, ng, nh, nx, ny])
      openSet.add(nx + " " + ny)
    }
  
  // if (openSet.has(`${neighbors[i][0]} ${neighbors[i][1]}`)) {}
  }
  setTimeout(() => {
    aStar()
  }, 750)
}
function aStarCalc(x, y, x2, y2) {
return Math.pow(x - x2, 2) + Math.pow(y - y2, 2)
}
function getNeighbors(x, y) {
let neighbors = []
if (x - 1 >= 0) {
  neighbors.push([x - 1, y])
}
if (x + 1 < ROWS) {
  neighbors.push([x + 1, y])
}
if (y - 1 >= 0) {
  neighbors.push([x, y - 1])
}
if (y + 1 < COLS) {
  neighbors.push([x, y + 1])
}
for (let i = 0; i < neighbors.length; i++) {
  if (closedSet.has(neighbors[i][0] + " " + neighbors[i][1])) {
    // console.log("removing: ", neighbors[i][0], neighbors[i][1])
    neighbors.splice(i, 1)
  }
}
return neighbors
}