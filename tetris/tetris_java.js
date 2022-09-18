document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10;
    const ScoreDisplay= document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')

    //The Tetrominoes

    const lTetromino = [
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
    ]
  
    const zTetromino = [
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1],
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1]
    ]
  
    const tTetromino = [
      [1,width,width+1,width+2],
      [1,width+1,width+2,width*2+1],
      [width,width+1,width+2,width*2+1],
      [1,width,width+1,width*2+1]
    ]
  
    const oTetromino = [
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1]
    ]
  
    const iTetromino = [
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3],
      [1,width+1,width*2+1,width*3+1],
      [width,width+1,width+2,width+3]
    ]
  
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
  
    let currentPosition = 4
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


// make the tetromino move every second downwards

timerId = setInterval(moveDown, 500);

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
      random = Math.floor(Math.random()*theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
  }
}


//end of function
})