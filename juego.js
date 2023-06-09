// Variables para el juego
let currentPlayer = "X";
let cells = document.getElementsByTagName("td");
let gameFinished = false;

// Agregar eventos a los botones
document.getElementById("playerX").addEventListener("click", function() {
    currentPlayer = "X";
});

document.getElementById("playerY").addEventListener("click", function() {
    currentPlayer = "O";
    makeMove();
});

document.getElementById("reset").addEventListener("click", function() {
    resetGame();
});

// Agregar eventos a las celdas
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
        if (!gameFinished && cells[i].innerHTML === "") {
            cells[i].innerHTML = currentPlayer;
            cells[i].style.pointerEvents = "none";

            if (checkWin(currentPlayer)) {
                alert("¡El jugador " + currentPlayer + " ha ganado!");
                gameFinished = true;
            } else if (checkDraw()) {
                alert("¡Es un empate!");
                gameFinished = true;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                makeMove();
            }
        }
    });
}

// Función para reiniciar el juego
function resetGame() {
    currentPlayer = "X";
    gameFinished = false;
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].style.pointerEvents = "auto";
    }
}

// Función para que la máquina haga su movimiento utilizando el algoritmo Minimax
function makeMove() {
    if (!gameFinished && currentPlayer === "O") {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML === "") {
                cells[i].innerHTML = currentPlayer;
                cells[i].style.pointerEvents = "none";
                let score = minimax(cells, 0, false);
                cells[i].innerHTML = "";
                cells[i].style.pointerEvents = "auto";

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        cells[bestMove].innerHTML = currentPlayer;
        cells[bestMove].style.pointerEvents = "none";

        if (checkWin(currentPlayer)) {
            alert("¡El jugador " + currentPlayer + " ha ganado!");
            gameFinished = true;
        } else if (checkDraw()) {
            alert("¡Es un empate!");
            gameFinished = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

// Función para el algoritmo Minimax
function minimax(cells, depth, isMaximizing) {
    let scores = {
        X: -10,
        O: 10,
        tie: 0
    };

    if (checkWin("X")) {
        return scores.X - depth;
    }

    if (checkWin("O")) {
        return scores.O - depth;
    }

    if (checkDraw()) {
        return scores.tie;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML === "") {
                cells[i].innerHTML = "O";
                let score = minimax(cells, depth + 1, false);
                cells[i].innerHTML = "";
                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;
    } else {
        let bestScore = Infinity;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML === "") {
                cells[i].innerHTML = "X";
                let score = minimax(cells, depth + 1, true);
                cells[i].innerHTML = "";
                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

// Resto del código...

// Función para comprobar si un jugador ha ganado
function checkWin(player) {
    let winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winCombinations.length; i++) {
        let combination = winCombinations[i];
        if (
            cells[combination[0]].innerHTML === player &&
            cells[combination[1]].innerHTML === player &&
            cells[combination[2]].innerHTML === player
        ) {
            return true;
        }
    }

    return false;
}

// Función para comprobar si hay un empate
function checkDraw() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === "") {
            return false;
        }
    }
    return true;
}