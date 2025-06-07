function Game() {
    const init = () => {
        // render dom
        // cache dom elm
    }
    const changeTurn = () => {
        const gameBoardElm = document.querySelector("#gameboard");
        const currentTurn = gameBoardElm.getAttribute("turn");
        if (currentTurn === "O") {
            gameBoardElm.setAttribute("turn", "X")
        } else {
            gameBoardElm.setAttribute("turn", "O")
        }
    }
    const updateBoardArray = () => {
        // get the location and player
        const gameboard = ['-','-','-','-','-','-','-','-','-'];
        for (let i = 0; i < 9; i++) {
            const boxselector = `#box${i.toString()}`
            const box = document.querySelector(boxselector);
            if (box.classList.contains("O")) {
                gameboard[i] = "O";
            } else if (box.classList.contains("X")) {
                gameboard[i] = "X";
            }
        }
        // edit the board array
        return gameboard;
    }
    const winner = null;
    const isOver = (newestGBArray) => {
        const gameboard = newestGBArray;
        const gameBoardElm = document.querySelector("#gameboard");
        // check if the game is won
        for (let i = 0; i < 3; i++) {
            const isHorzontalWin = (gameboard[i] === gameboard [i+1] && gameboard[i] === gameboard[i+2]) && gameboard[i] !== "-";
            const isVerticalWin = (gameboard[i] === gameboard[i+3] && gameboard[i] === gameboard[i+6]) && gameboard[i] !== "-";

            if (isHorzontalWin || isVerticalWin) {
                this.winner = gameboard[i];
                gameBoardElm.setAttribute("winner", this.winner);
                return true;
            }
        }
        if (((gameboard[0] === gameboard[4] && gameboard [0] === gameboard[8]) && gameboard[0] !== "-"|| (gameboard[2] === gameboard[4] && gameboard[2] === gameboard[6] && gameboard[2] !== "-"))) {
            this.winner = gameboard[4];
            gameBoardElm.setAttribute("winner", this.winner);
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
            gameBoardElm.setAttribute("winner", "draw");
            return true;
        }
        return false;
    }
    const endGame = () => {
        // show end game msg
        // find out the winner
        // show the winner
    }
    return { init, changeTurn, updateBoardArray, winner, isOver, endGame };
}

function DOMController(game) {
    const gameBoardDomElm = document.querySelector("#gameboard");
    const winerElm = document.querySelector("#winner");
    const reset = document.querySelector("#reset");
    const renderBoxes = () => {
        for (let i = 0; i < 9; i++) {
            const boxElm = document.createElement("div");
            boxElm.id = `box${i}`
            boxElm.classList.add("playing-box");
            boxElm.addEventListener("click", clickHandler);
            gameBoardDomElm.appendChild(boxElm);
        }
    }
    const resetHandler = () => {
        for (let i = 0; i < 9; i++) {
            const boxselector = `#box${i.toString()}`
            const box = document.querySelector(boxselector);
            box.classList.remove("Played");
            box.classList.remove("X");
            box.classList.remove("O");
            box.textContent = "";
            gameBoardDomElm.setAttribute("turn", "O");
            gameBoardDomElm.setAttribute("winner", "");
            winerElm.classList.remove("visable");
            reset.classList.remove("visable");
            document.querySelector("#reset").removeEventListener("click", resetHandler)
        }
    }
    const clickHandler = (event) => {
        if (event.target.classList.contains("Played")) {
            return;
        }
        if (document.querySelector("#gameboard").getAttribute("winner")) {
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
        const updatedGameBoardArray = game.updateBoardArray();
        if (game.isOver(updatedGameBoardArray) === true) {
            const winner = document.querySelector("#gameboard").getAttribute("winner");
            winerElm.classList.add("visable");
            reset.classList.add("visable");
            if (winerElm.textContent !== "draw") {
                winerElm.textContent = `Game End! Winner is ${winner}`
            } else {
                winerElm.textContent = `Game End! Draw~`
            }
            document.querySelector("#reset").addEventListener("click", resetHandler)
            return;
        }
    }
    return { gameBoardDomElm, renderBoxes, resetHandler }
}

const newGame = new Game();
const DOM = new DOMController(newGame);

DOM.renderBoxes();