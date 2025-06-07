function confirmNew() {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
}

function Gameboard() {
    const create = () => {
        const gameBoardArea = ['-','-','-','-','-','-','-','-','-'];
        return gameBoardArea;
    }
    return { create }
}

function Players() {
    const create = () => {
        const players = ['-','-'];
        return players;
    }
    return { create }
}

function Game(gameboard, players) {
    const init = () => {
        // render dom
        // cache dom elm
    }
    const changeTurn = () => {
        const gameBoard = document.querySelector("#gameboard");
        const currentTurn = gameBoard.getAttribute("turn");
        if (currentTurn === "O") {
            gameBoard.setAttribute("turn", "X")
        } else {
            gameBoard.setAttribute("turn", "O")
        }
    }
    const makeAMove = (gameboard, location, player) => {
        // get the location and player
        // edit the board array
        gameboard[location] = player;
        return gameboard;
    }
    const winner = null;
    const isOver = (gameboard) => {
        // check if the game is won
        for (let i = 0; i < 3; i++) {
            const j = 0 + i * 3;
            if ((gameboard[j] === gameboard [j+1] && gameboard[j] === gameboard[j+2]) || (gameboard[j] === gameboard[j+3] && gameboard[j] === gameboard[j+6])) {
                this.winner = gameboard[j];
                return true;
            }
        }
        if ((gameboard[0] === gameboard[4] && gameboard [0] === gameboard[8]) || (gameboard[2] === gameboard[4] && gameboard[2] === gameboard[6])) {
            this.winner = gameboard[4];
            return true;
        }
        // check if the game is equal
        let isFull = false;
        for (let i = 0; i < 9; i++) {
            if (gameboard[i] === '-') {
                isFull = false
                break;
            }
            isFull = true;
        }
        if (isFull === true) {
            return true;
        }
        return false;
    }
    const endGame = () => {
        // show end game msg
        // find out the winner
        // show the winner
    }
    return { init, changeTurn, makeAMove, winner, isOver, endGame };
}

function DOMController(gameboard, game, players) {
    const gameBoardDomElm = document.querySelector("#gameboard");
    const renderBoxes = () => {
        for (let i = 0; i < 9; i++) {
            const boxElm = document.createElement("div");
            boxElm.id = `${i}`
            boxElm.classList.add("playing-box");
            boxElm.addEventListener("click", clickHandler);
            gameBoardDomElm.appendChild(boxElm);
        }
    }
    const clickHandler = (event) => {
        if (event.target.classList.contains("Played")) {
            return;
        }
        // click change display
        event.target.classList.add("expand");
        setTimeout(() => event.target.classList.remove("expand"), 300)

        // get current player and make the move
        const currentTurn = document.querySelector("#gameboard").getAttribute("turn");
        event.target.classList.add("Played");
        event.target.classList.add(currentTurn);
        game.changeTurn();

        // change box elm text
        event.target.textContent = currentTurn;
    }
    return { gameBoardDomElm, renderBoxes }
}

const gameboardController =  new Gameboard;
const playersController = new Players;
const gameboard = gameboardController.create();
const players = playersController.create();
const newGame = new Game(gameboard, players);
const DOM = new DOMController(gameboard, newGame, players);

DOM.renderBoxes();