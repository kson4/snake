const ROWS = 25
const COLS = 25

class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.availableCells = new Set()
  }
  initialize(board) {
    for (let i = 0; i < this.rows; i++) {
      const row = document.createElement("div")
      row.classList.add(`r${i}`, "row")
      for (let j = 0; j < this.cols; j++) {
        const cell = document.createElement("div")
        cell.setAttribute("id", `r${i}c${j}`)
        cell.classList.add("cell")
        row.appendChild(cell)
        this.availableCells.add(`r${i}c${j}`)
      }
      board.appendChild(row)
    }
  }
}
class Snake {
  constructor() {
    this.x = 2
    this.y = 1
    this.length = 1
    this.body = []
    this.direction = [0, 0]
  }
  draw(availableCells) {
    this.x += this.direction[0]
    this.y += this.direction[1]
    availableCells.delete(`r${this.x}c${this.y}`)
    const head = document.querySelector("#r2c1")
    head.classList.add("snake")
    this.body.push(`r${this.x}c${this.y}`)
    if (this.length < this.body.length) {
      const cell = this.body.shift()
      console.log(availableCells)
      document.querySelector(`.${cell}`).classList.remove("snake")
      availableCells.add(cell)
    }
  }
  changeDirection(direction) {
    if (direction === "up")
      this.direction = [-1, 0]
    else if (direction === "right")
      this.direction = [0, 1]
    else if (direction === "down")
      this.direction = [1, 0]
    else if (direction === "left")
      this.direction = [0, -1]
  }
}
class Apple {
  constructor() {
    this.x = 0
    this.y = 0
  }
  draw(availableCells) {
    // const toArray = Array.from(availableCells)
    // const spot = toArray[Math.floor(Math.random() * toArray.length)]
    // availableCells.delete(spot)
    // const cell = document.querySelector(`#${spot}`)

    const cell = document.querySelector(`#r${ROWS - 5}c${COLS - 5}`)
    cell.classList.add("apple")
    let location = cell.id
    location = location.replace("r", "").replace("c", " ")
    location = location.split(" ")
    this.x = location[0]
    this.y = location[1]
  }
}
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
      let inserted = false
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i][0] > f) {
          this.collection.splice(i, 0, [f, g, h, x, y])
          break;
        }
      }
      // if (!inserted) {
      //   this.collection.push([f, g, h, x, y])
      // }
      // else {
      //   this.collection.splice(idx, 0, [f, g, h, x, y])
      // }
      
      // this.collection.splice(idx, 0, [f, g, h, x, y])
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
class Node {
  
}

const gameBoard = document.querySelector(".game-board")
export const board = new Board(ROWS, COLS)
board.initialize(gameBoard)

export const snake = new Snake()
snake.draw(board.availableCells)

export const apple = new Apple()
apple.draw(board.availableCells)

// window.addEventListener("keydown", e => {
//   if (e.key == "ArrowUp")
//     snake.changeDirection("up")
//   else if (e.key == "ArrowRight")
//     snake.changeDirection("right")
//   else if (e.key == "ArrowDown")
//     snake.changeDirection("down")
//   else if (e.key == "ArrowLeft")
//     snake.changeDirection("left")
//   snake.draw(board.availableCells)
// })

console.log(snake.x, snake.y, apple.x, apple.y)

const open = new PriorityQueue()
open.enqueue(aStarCalc(snake.x, snake.y, apple.x, apple.y), 0, 
  aStarCalc(snake.x, snake.y, apple.x,  apple.y), snake.x, snake.y)

const openSet = new Set()
const closedSet = new Set()

aStar()
export function aStar() {
  console.log(open)
  const cell = open.dequeue()
  let f = cell[0]
  let g = cell[1]
  let h = cell[2]
  let x = cell[3]
  let y = cell[4]
  console.log(f)
  document.querySelector(`#r${x}c${y}`).classList.add("traveled")
  if (x == apple.x && y == apple.y) {
    console.log("FOUND")
    return
  }
  openSet.add(`${x} ${y}`)
  closedSet.add(`${x} ${y}`)

  let neighbors = getNeighbors(x, y)
  for (let i = 0; i < neighbors.length; i++) {
    let nx = neighbors[i][0]
    let ny = neighbors[i][1]
    const ng = g + 1
    const nh = aStarCalc(nx, ny, apple.x, apple.y)
    const nf = parseFloat(ng) + parseFloat(nh)
    
    if (!openSet.has(nx + " " + ny)) {
      open.enqueue(nf, ng, nh, nx, ny)
      openSet.add(nx + " " + ny)
    }
  }
  console.log("------------------------------------------------------------------------------------")
  setTimeout(() => {
    aStar()
  }, 50)
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
  return neighbors
}