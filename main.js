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
        gameStart(type) {
                this.currentTurn = 'X';
                if (this.gameType == 'pvp') {
                        squares.forEach((el, index) => {
                                el.classList.add(`s${index + 1}`);
                                el.addEventListener('click', event => {
                                        if (!event.target.textContent && this.currentTurn !== null) {
                                                event.target.textContent = this.currentTurn;
                                                this.board[index] = this.currentTurn;
                                                this.checkWin(this.currentTurn);
                                                if (this.winner == null) {
                                                        this.switchTurn();
                                                } else {
                                                        output.textContent = `The winner is ${this.winner}!`;
                                                }
                                        } else if (!this.currentTurn) {
                                                this.currentTurn = 'X';
                                                event.target.textContent = this.currentTurn;
                                                this.board[index] = this.currentTurn;
                                                this.checkWin(this.currentTurn);
                                                console.log(this.currentTurn);
                                                if (this.winner == null) {
                                                        this.switchTurn();
                                                } else {
                                                        output.textContent = `The winner is ${this.winner}!`;
                                                }
                                        }
                                });
                        });
                } else if (this.gameType == 'pve') {
                        console.log('in pve');
                        // Set square event listeners & manage player turn
                        squares.forEach((el, index) => {
                                el.classList.add(`s${index + 1}`);
                        });
                        squares.forEach((el, index) => {
                                el.addEventListener('click', event => {
                                        if (!event.target.textContent && this.currentTurn == 'X') {
                                                event.target.textContent = this.currentTurn;
                                                this.board[index] = this.currentTurn;
                                                this.checkWin(this.currentTurn);
                                                if (this.winner == null) {
                                                        this.switchTurn();
                                                        const that = this;
                                                        setTimeout(function cpu() {
                                                                const cpuPick = Math.floor(Math.random() * 9);
                                                                if (that.board[cpuPick] == undefined) {
                                                                        that.board[cpuPick] = 'O';
                                                                        document.querySelector(
                                                                                `.s${cpuPick + 1}`
                                                                        ).textContent = 'O';
                                                                        that.checkWin(that.currentTurn);
                                                                        if (that.winner == null) {
                                                                                that.switchTurn();
                                                                        } else {
                                                                                output.textContent = `The winner is ${
                                                                                        that.winner
                                                                                }!`;
                                                                        }
                                                                } else {
                                                                        let force = 0;
                                                                        while (force < 9) {
                                                                                if (
                                                                                        that.board[force] ==
                                                                                                undefined &&
                                                                                        that.currentTurn == 'O'
                                                                                ) {
                                                                                        that.board[force] = 'O';
                                                                                        document.querySelector(
                                                                                                `.s${force + 1}`
                                                                                        ).textContent = 'O';
                                                                                        that.checkWin(that.currentTurn);
                                                                                        if (that.winner == null) {
                                                                                                that.switchTurn();
                                                                                                break;
                                                                                        } else {
                                                                                                output.textContent = `The winner is ${
                                                                                                        that.winner
                                                                                                }!`;
                                                                                                break;
                                                                                        }
                                                                                }
                                                                                force++;
                                                                        }
                                                                }
                                                        }, 1000);
                                                } else {
                                                        output.textContent = `The winner is ${this.winner}!`;
                                                }
                                        }
                                });
                        });
                }
        },
        switchTurn() {
                console.log('switch turns');
                if (this.currentTurn == 'X') {
                        this.currentTurn = 'O';
                } else {
                        this.currentTurn = 'X';
                }
        },
        checkWin(marker) {
                console.log('check win');
                if (this.board[0] == marker && this.board[1] == marker && this.board[2] == marker) {
                        this.winner = marker;
                } else if (this.board[3] == marker && this.board[4] == marker && this.board[5] == marker) {
                        this.winner = marker;
                } else if (this.board[6] == marker && this.board[7] == marker && this.board[8] == marker) {
                        this.winner = marker;
                } else if (this.board[0] == marker && this.board[3] == marker && this.board[6] == marker) {
                        this.winner = marker;
                } else if (this.board[1] == marker && this.board[4] == marker && this.board[7] == marker) {
                        this.winner = marker;
                } else if (this.board[2] == marker && this.board[5] == marker && this.board[8] == marker) {
                        this.winner = marker;
                } else if (this.board[0] == marker && this.board[4] == marker && this.board[8] == marker) {
                        this.winner = marker;
                } else if (this.board[2] == marker && this.board[4] == marker && this.board[6] == marker) {
                        this.winner = marker;
                } else if (!gameBoard.board.includes(undefined) && gameBoard.board.length === 9) {
                        output.textContent = `The game is a tie!`;
                }
        },
        resetGame() {
                this.winner = null;
                this.board = [];
                this.currentTurn = null;
                squares.forEach(el => {
                        el.textContent = '';
                });
                output.textContent = '';
                this.gameStart();
        },
}))();

function showGame() {
        output.classList.remove('hide');
        reset.classList.remove('hide');
        grid.classList.remove('hide');
        document.querySelector('.game-settings').classList.add('hide');
}

pveButton.addEventListener('click', () => {
        gameBoard.gameType = 'pve';
        showGame();
        gameBoard.gameStart('pve');
});

pvpButton.addEventListener('click', () => {
        gameBoard.gameType = 'pvp';
        showGame();
        gameBoard.gameStart('pvp');
});
reset.addEventListener('click', () => {
        gameBoard.resetGame();
});
