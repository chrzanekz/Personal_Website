
// wait to fully load HTML file
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10;
    let nextRandom = 0
    const scoreDisplay= document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    let timerId

    //The Tetrominoes shapes


    // L shape for 10 width
    const lTetromino = [
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
    ]
  
    // Z shape for 10 width
    const zTetromino = [
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1],
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1]
    ]
    //T shape for 10 width
    const tTetromino = [
      [1,width,width+1,width+2],
      [1,width+1,width+2,width*2+1],
      [width,width+1,width+2,width*2+1],
      [1,width,width+1,width*2+1]
    ]
    // square shape for 10 width
    const oTetromino = [
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1]
    ]
    //I shape for 10 width
    const iTetromino = [
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3],
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3]
    ]
    
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    
    //start position of tetrominoes
    let currentPosition = 4
    //rotation of tetrominoes shapes
    let currentRotation = 0

    //randomly selecting a form of tetromino
    let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  //drawing of first rotation of first tetromino

  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    }
      )
  }

  

  //undrawing the Tetromino

  function undraw () {
    current.forEach(index => {
      squares[currentPosition+index].classList.remove('tetromino')
    })
  }


// make the tetromino move every half second downwards

//timerId = setInterval(moveDown, 500);

//asign functions to keyCodes for moving tetrominoes for left/right

function control(e){
  if (e.keyCode === 37){
    moveLeft()
  }
  else if (e.keyCode === 67){
    rotate()
  }
  else if (e.keyCode === 39){
    moveRight()
  }
  else if (e.keyCode === 40){
    moveDown()
  }
}
//The keyup event is fired when a key is released.
document.addEventListener('keyup',control)

//moveDown function

function moveDown(){
  undraw()
  currentPosition += width
  draw()
  freeze()
};

// freeze function

function freeze(){
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => squares[currentPosition+index].classList.add('taken'))
      //start new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
  }
}

//moving tetromino to the left until it reaches modulo 0

function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
  if(!isAtLeftEdge) currentPosition -=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }
  draw()
}

//moving tetromino to the left until it reaches full 1

function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => [currentPosition + index] % width === width -1)
  if(!isAtRightEdge) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
    currentPosition -=1
  }
  draw()
}

//rotate tetrominoes

function rotate(){
  undraw()
  currentRotation++
  if (currentRotation===current.length){//current rotation above 4 is reset to 0
    currentRotation=0
  }
  current=theTetrominoes[random][currentRotation]
  draw()
}

//show-up next tetromino in mini-grid
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0

//theTetrominoes without rotations
  const upNextTetrominoes =[
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [displayWidth+1, displayWidth+2, displayWidth*2+1, displayWidth*2+2], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]
function displayShape(){
  displaySquares.forEach(square => {
    //remove any previous tetrominoes
    square.classList.remove('tetromino')
  })
  upNextTetrominoes[nextRandom].forEach(index=>{
    displaySquares[displayIndex+index].classList.add('tetromino')
  })
}

//functonality of start/pause button

startBtn.addEventListener('click', ()=>{
  if (timerId){
    clearInterval(timerId)
    timerId = null
  }
  else {
    draw()
    timerId=setInterval(moveDown, 500)
    nextRandom=Math.floor(Math.random()*theTetrominoes.length)
    displayShape()
  }
})


//end of code
})