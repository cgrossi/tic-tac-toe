const output = document.querySelector('.output');
const grid = document.querySelector('.game-board');
const squares = document.querySelectorAll('.square');
const pveButton = document.querySelector('.pve');
const pvpButton = document.querySelector('.pvp');
const reset = document.querySelector('.reset');

const gameBoard = (() => ({
  currentTurn: null,
  gameType: null,
  board: [],
  winner: null,
  setBoard() {
    squares.forEach((square, index) => {
      square.classList.add(`s${index + 1}`);
    }) 
    squares.forEach(el => {
      el.addEventListener('click', moveHandler)
    })
  },
  switchTurn() {
    if (this.currentTurn == 'X') {
      this.currentTurn = 'O';
    } else {
      this.currentTurn = 'X';
    }
  },
  checkWin(marker) {
    if (
      this.board[0] == marker &&
      this.board[1] == marker &&
      this.board[2] == marker) {
      this.winner = marker;
      this.announceWinner(gameBoard.winner);
    } else if (
      this.board[3] == marker &&
      this.board[4] == marker &&
      this.board[5] == marker) {
      this.winner = marker;
      this.announceWinner(gameBoard.winner);
    } else if (
      this.board[6] == marker &&
      this.board[7] == marker &&
      this.board[8] == marker) {
      this.winner = marker;
      this.announceWinner(gameBoard.winner);
    } else if (
      this.board[0] == marker &&
      this.board[3] == marker &&
      this.board[6] == marker) {
      this.winner = marker;
      this.announceWinner(gameBoard.winner);
    } else if (
      this.board[1] == marker &&
      this.board[4] == marker &&
      this.board[7] == marker) {
      this.winner = marker;
      this.announceWinner(gameBoard.winner);
    } else if (
      this.board[2] == marker &&
      this.board[5] == marker &&
      this.board[8] == marker) {
      this.winner = marker;
      this.announceWinner(gameBoard.winner);
    } else if (
      this.board[0] == marker &&
      this.board[4] == marker &&
      this.board[8] == marker) {
      this.winner = marker;
      this.announceWinner(gameBoard.winner);
    } else if (
      this.board[2] == marker &&
      this.board[4] == marker &&
      this.board[6] == marker) {
      this.winner = marker;
      this.announceWinner(gameBoard.winner);
    } else if (!gameBoard.board.includes(undefined) && gameBoard.board.length === 9) {
      output.textContent = `The game is a tie!`;
    }
  },
  announceWinner(winner) {
    output.textContent = `The winner is ${winner}`
  },
  resetGame() {
    this.winner = null;
    this.board = [];
    this.currentTurn = 'X';

    squares.forEach(el => {
      el.textContent = '';
    });

    output.textContent = '';
  },
}))();

function showGame() {
  output.classList.remove('hide');
  reset.classList.remove('hide');
  grid.classList.remove('hide');

  document.querySelector('.game-settings').classList.add('hide');
}

const moveHandler = (event) => {
  if(event.target.textContent || gameBoard.winner) {
    return console.log('Invalid move')
  }

  if(gameBoard.gameType === 'pvp') {
    event.target.textContent = gameBoard.currentTurn
    gameBoard.board[+Array.from(event.target.classList).find(el => el.match(/^s\d/))[1] - 1] = gameBoard.currentTurn;
    gameBoard.checkWin(gameBoard.currentTurn);
    gameBoard.switchTurn();
  }

  if(gameBoard.gameType === 'pve') {

    event.target.textContent = gameBoard.currentTurn
    gameBoard.board[+Array.from(event.target.classList).find(el => el.match(/^s\d/))[1] - 1] = gameBoard.currentTurn;
    gameBoard.checkWin(gameBoard.currentTurn);
    gameBoard.switchTurn();


    setTimeout(function cpu() {
      const cpuPick = Math.floor(Math.random() * 9);

      if (gameBoard.board[cpuPick] == undefined) {
        gameBoard.board[cpuPick] = 'O';
        document.querySelector(`.s${cpuPick + 1}`).textContent = 'O';
        gameBoard.checkWin(gameBoard.currentTurn);
        gameBoard.switchTurn();

      } else {

        let force = 0;
        while (force < 9) {
          if (gameBoard.board[force] == undefined && gameBoard.currentTurn == 'O') {
            gameBoard.board[force] = 'O';
            document.querySelector(`.s${force + 1}`).textContent = 'O';
            gameBoard.checkWin(gameBoard.currentTurn);
            gameBoard.switchTurn();
            break;
          }
          force++;
        }
      }

    }, 2000)

  }
}

pveButton.addEventListener('click', () => {
  gameBoard.gameType = 'pve';

  showGame();

  gameBoard.currentTurn = 'X'
  gameBoard.setBoard();
});

pvpButton.addEventListener('click', () => {
  gameBoard.gameType = 'pvp';

  showGame();
  gameBoard.currentTurn = 'X'
  gameBoard.setBoard();
});

reset.addEventListener('click', () => {
  gameBoard.resetGame();
});