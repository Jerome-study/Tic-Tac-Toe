const grid = document.getElementById('grid')
const X_SCORE = document.getElementById('player-x-score')
const O_SCORE = document.getElementById('player-o-score')
const resetButton = document.getElementById('reset-btn')
let currentPlayer = "X"
let gameRunning = false
let roundWon = false
let isDraw = false
const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


let cellArray = []
let cellCount = []

startGame()

function startGame () {
    createBoard()
    
    function createBoard () {
        for (let i = 0; i < 9; i ++) {
            const cell = document.createElement('div')
            cellArray.push(cell)
            cell.classList.add('box')
            grid.appendChild(cell)
        }
    }

    cellArray.forEach(cells => {
        cells.addEventListener('click', buttonClick)
        
    })

    function buttonClick() {
        this.textContent = currentPlayer
        cellCount.push(currentPlayer)
        changePlayer()
        this.removeEventListener('click',buttonClick)
        
    }

    function changePlayer() {
        if (currentPlayer === "X") {
            currentPlayer = "O"
        } else if (currentPlayer === "O") {
            currentPlayer = "X"
        }
        checkWinner()
    }

    function checkWinner() {
        
        for (let i = 0; i < winningCombination.length; i++) {
            const cellA = cellArray[winningCombination[i][0]].textContent
            const cellB = cellArray[winningCombination[i][1]].textContent
            const cellC = cellArray[winningCombination[i][2]].textContent
            
            if (cellA === "X" && cellB === "X" && cellC === "X" ) {
                roundWon = true
                X_SCORE.innerText =  parseInt(X_SCORE.innerText) + 1
                currentPlayer = "X"
                break;
            }
            else if (cellA === "O" && cellB === "O" && cellC === "O") {
                roundWon = true
                O_SCORE.innerText =  parseInt(O_SCORE.innerText) + 1
                currentPlayer = "O"
                break;
            }
            
            
        }

        if (roundWon) {
                
            disableButton()
            generateResetButton()
        } else if (cellCount.length ===9 ) {
            disableButton()
            generateResetButton()
        } 

       
       
    }

    function disableButton () {
        cellArray.forEach(button => {
            button.removeEventListener('click', buttonClick)
        })
    }

    function generateResetButton () {
        resetButton.style.display = 'block'

        resetButton.addEventListener('click', reset)
    }
    
    function reset () {
        
        cellArray.forEach(button => {
            button.innerText = ""
            button.addEventListener('click', buttonClick)
        })
        currentPlayer = "X"
        roundWon = false
        cellCount = []
        resetButton.style.display = 'none'
    }
}


