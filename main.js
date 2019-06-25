const output = document.querySelector('.output')
const squares = document.querySelectorAll('.square')
squares.forEach((el, index) => {
    el.classList.add(`s${index + 1}`)
    el.addEventListener('click', (event) => {
        if(!event.target.textContent && gameBoard.currentTurn !== null) {
            event.target.textContent = gameBoard.currentTurn;
            gameBoard.board[index] = gameBoard.currentTurn;
            gameBoard.checkWin(gameBoard.currentTurn)
            if(gameBoard.winner == null) {
                gameBoard.switchTurn();
            } else {
                output.textContent = `The winner is ${gameBoard.winner}!`
            }
        } else if (!gameBoard.currentTurn) {
            gameBoard.currentTurn = 'X'
            event.target.textContent = gameBoard.currentTurn;
            gameBoard.board[index] = gameBoard.currentTurn;
            gameBoard.checkWin(gameBoard.currentTurn)
            console.log(gameBoard.currentTurn)
            if(gameBoard.winner == null) {
                gameBoard.switchTurn();
            } else {
                output.textContent = `The winner is ${gameBoard.winner}!`
            }
            
        }
    })
})

const gameBoard = {
    currentTurn: null,
    board: [],
    switchTurn(){
        if(this.currentTurn == 'X') {
            this.currentTurn = 'O'
        } else {
            this.currentTurn = 'X'
        }
    },
    checkWin(marker) {
        if(this.board[0] == marker && this.board[1] == marker && this.board[2] == marker) {
            this.winner = marker
        }
        if(this.board[3] == marker && this.board[4] == marker && this.board[5] == marker) {
            this.winner = marker
        }
        if(this.board[6] == marker && this.board[7] == marker && this.board[8] == marker) {
            this.winner = marker
        }
        if(this.board[0] == marker && this.board[3] == marker && this.board[6] == marker) {
            this.winner = marker
        }
        if(this.board[1] == marker && this.board[4] == marker && this.board[7] == marker) {
            this.winner = marker
        }
        if(this.board[2] == marker && this.board[5] == marker && this.board[8] == marker) {
            this.winner = marker
        }
        if(this.board[0] == marker && this.board[4] == marker && this.board[8] == marker) {
            this.winner = marker
        }
        if(this.board[2] == marker && this.board[4] == marker && this.board[6] == marker) {
            this.winner = marker
        }
    },
    winner: null
}

const reset = document.querySelector('button')

reset.addEventListener('click', () => {
    gameBoard.winner = null
    gameBoard.board = []
    gameBoard.currentTurn = null
    squares.forEach(el => {
        el.textContent = ''
    })
    output.textContent = ''
})

// const PlayerFactory = (playerMarker, playerName) => {
//     return {
//         playerMarker,
//         playerName
//     }
// }

// const p1 = PlayerFactory('X', 'PlayerOne')

// console.log(p1.playerMarker, p1.playerName)

