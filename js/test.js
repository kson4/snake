const ROWS = 10
const COLS = 10

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
    this.aiPath = []
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
      document.querySelector(`#${cell}`).classList.remove("snake")
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
  walkPath() {
    return new Promise((res) => {
      let coordinates = this.aiPath.shift()
      console.log(coordinates)
      const head = document.querySelector(`#r${coordinates[0]}c${coordinates[1]}`)
      head.classList.remove("traveled")
      head.style.backgroundColor = ""
      head.classList.add("snake")
      console.log(head.classList)
      this.body.push(`r${coordinates[0]}c${coordinates[1]}`)
      console.log(this.body)
      // console.log(head)
      if (this.length < this.body.length) {
        const cell = this.body.shift()
        console.log(cell)
        console.log(document.querySelector(`#${cell}`))
        document.querySelector(`#${cell}`).classList.remove("snake")
        document.querySelector(`#${cell}`).classList.remove("traveled")
      }
      setTimeout(() => {
        if (this.aiPath.length !== 0) {
          res(this.walkPath())
        }
        else {
          apple.draw(board.availableCells)
          this.length++
          res()
        }
      }, 100)
    })
    
  }
}
class Apple {
  constructor() {
    this.x = 0
    this.y = 0
  }
  draw(availableCells) {
    document.querySelector(`#r${this.x}c${this.y}`).classList.remove("apple")
    const toArray = Array.from(availableCells)
    const spot = toArray[Math.floor(Math.random() * toArray.length)]
    availableCells.delete(spot)
    const cell = document.querySelector(`#${spot}`)

    // const cell = document.querySelector(`#r${ROWS - 5}c${COLS - 5}`)
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
  enqueue(f, g, h, x, y, cell) {
    if (this.collection.length === 0) {
      this.collection.push([f, g, h, x, y, cell])
    }
    else if (this.collection[this.collection.length - 1][0] < f) {
      this.collection.push([f, g, h, x, y, cell])
    }
    else {
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i][0] > f) {
          this.collection.splice(i, 0, [f, g, h, x, y, cell])
          break;
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

let open = new PriorityQueue()
open.enqueue(aStarCalc(snake.x, snake.y, apple.x, apple.y), 0, 
  aStarCalc(snake.x, snake.y, apple.x,  apple.y), snake.x, snake.y, -1)

const openSet = new Set()
const closedSet = new Set()

const node = await aStar()
console.log(node)
// console.log(node(res))
await displayPath(node)
await snake.walkPath()

export function aStar() {
  return new Promise((res) => {
    const cell = open.dequeue()
    let f = cell[0]
    let g = cell[1]
    let h = cell[2]
    let x = cell[3]
    let y = cell[4]
    document.querySelector(`#r${x}c${y}`).classList.add("traveled")
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
        open.enqueue(nf, ng, nh, nx, ny, cell)
        openSet.add(nx + " " + ny)
      }
    }
    setTimeout(() => {
      if (!(x == apple.x && y == apple.y)) {
        res(aStar())
      }
      else {
        console.log("ENDING: ")
        console.log(cell, cell[3], cell[4])
        console.log(apple.x, apple.y)
        res(cell)
      }
    }, 250)
  })
  
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
function displayPath(cell) {
  return new Promise((res) => {
    console.log(cell)
    document.querySelector(`#r${cell[3]}c${cell[4]}`).style.backgroundColor = "yellow"
    snake.aiPath.unshift([cell[3], cell[4]])
    setTimeout(() => {
      if (cell[5] != -1) {
        res(displayPath(cell[5]))
      }
      else {
        res()
      }
    }, 50)
  })
 
}