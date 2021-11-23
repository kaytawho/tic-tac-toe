const gameStatus = document.querySelector('.status');
const xScore = document.querySelector('.xscore');
const oScore = document.querySelector('.oscore');

let isGameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let playerXScore = 0;
let playerOScore = 0;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Starting player's turn
function playerTurn() {
    return `It's ${currentPlayer}'s turn`;
}

gameStatus.innerHTML = playerTurn();

function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Alternating player's turn
function playerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; /// using a ternary operator - shorthand for an if statement
    gameStatus.innerHTML = playerTurn();
}

// Checking for empty cells to play
function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index') /// using data-cell-index
    );

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
}

// Validating results
function resultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCombos[i];
        let a = gameState[winCondition[0]]; //// evaluates cells 1-3 in any direction
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            /// compares the cells - if empty, continue
            continue;
        }
        if (a === b && b === c) {
            /// compares the cells - if all strictly equal: win
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.innerHTML = winnerMessage();
        if (currentPlayer === 'X') {
            xScore.innerHTML = playerXScore + 1;
        } else {
            oScore.innerHTML = playerOScore + 1;
        }
        isGameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        gameStatus.innerHTML = drawMessage();
        isGameActive = false;
        return;
    }

    playerChange();
}

// Game result messages
function winnerMessage() {
    return `Player ${currentPlayer} is the winner!`;
}

function drawMessage() {
    return `Game over. It's a tie!`;
}

/// Game restart
function restartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameStatus.innerHTML = playerTurn();
    document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
}

// Event listeners
document
    .querySelectorAll('.cell')
    .forEach((cell) => cell.addEventListener('click', cellClick));
document.querySelector('.restart').addEventListener('click', restartGame);
