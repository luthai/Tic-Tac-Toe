"use strict";

let coord = [];
let player_one_name = "";
let player_two_name = "";
let player_one_ready = false;

function Gameboard () {
    let x = 3, y = 3;
    let board = [];
    for (let i = 0; i < x; i++) {
        board[i] = [];
        for (let j = 0; j < y; j++) {
            board[i].push(Cell());
        }
    }
    
    const getBoard = () => board;
    const setMarking = (cell, player) => {
        if (board[cell[0]][cell[1]].getPlayerCell() === 0) {
            board[cell[0]][cell[1]].setPlayerCell(player);
        }    
    };

    return { getBoard, setMarking };
}

function Cell() {
    let cell = 0;
  
    const setPlayerCell = (player) => {       
        cell = player;
    };
  
    const getPlayerCell = () => cell;
  
    return { setPlayerCell, getPlayerCell };
}

function createPlayer (name, marking) {
    return { name, marking };
}

function playGame () {
    const player1 = createPlayer(player_one_name, "X");
    const player2 = createPlayer(player_two_name, "O");
    
    let board = Gameboard();

    let turn = 0;
    let activePlayer;
    let check_win = false;

    const boardCells = document.querySelectorAll(".cell");
    boardCells.forEach((elem) => {
        elem.addEventListener("click", (e) => {
            let text_coord = e.target.dataset.coord;
            coord = text_coord.split(" ");
            let coord_i = parseFloat(coord[0]);
            let coord_j = parseFloat(coord[1]);

            if (board.getBoard()[coord_i][coord_j].getPlayerCell() === 0 && check_win === false) {
                if (turn % 2 === 0) {
                    activePlayer = player1;
                }
                else {
                    activePlayer = player2;
                }
    
                board.setMarking([coord_i, coord_j], activePlayer);
                e.target.textContent = activePlayer.marking;
                
                if (turn > 3) {
                    check_win = winCondition(board.getBoard());
                }
        
                if (check_win == true) {
                    let win_message = document.querySelector(".game-message");
                    win_message.textContent = `Player ${activePlayer.name} have won!`;

                    let btn_reset_game = document.querySelector(".btn-reset-game");
                    btn_reset_game.style.visibility = "visible";
                }
    
                turn++;
            }
        })
    })
}

const btn_reset_game = document.querySelector(".btn-reset-game");
btn_reset_game.addEventListener("click", (e) => {
    window.location.reload();
})

const form_player_one = document.querySelector(".frm-player-one");
const input_player_one_name = document.querySelector(".input-player-one-name");
const p_player_one_name = document.querySelector(".player-one-name");
const btn_player_one_name = document.querySelector(".btn-player-one-name");
btn_player_one_name.addEventListener("click", (e) => {
    e.preventDefault();

    p_player_one_name.textContent = input_player_one_name.value;
    player_one_name = input_player_one_name.value;
    player_one_ready =true;

    form_player_one.style.display = "none";
})

const form_player_two = document.querySelector(".frm-player-two");
const input_player_two_name = document.querySelector(".input-player-two-name");
const p_player_two_name = document.querySelector(".player-two-name");
const btn_player_two_name = document.querySelector(".btn-player-two-name");
btn_player_two_name.addEventListener("click", (e) => {
    e.preventDefault();

    if (player_one_ready === true) {
        p_player_two_name.textContent = input_player_two_name.value;
        player_two_name = input_player_two_name.value;

        form_player_two.style.display = "none";

        playGame();
    } else {
        modal.style.display = "block";
        console.log(modal);
    }
})

const modal = document.querySelector(".modal");
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function printBoard (board) {
    let result = "";
    for (let i = 0; i < 3; i++)  {
        for (let j = 0; j < 3; j++) {
            result += " | ";
            if (board[i][j].getPlayerCell() === 0) {
                result += board[i][j].getPlayerCell() + " | ";
            } else {
                result += board[i][j].getPlayerCell().marking + " | ";
            }
        }
        result += "\n";
    }

    console.log(result);
}

function winCondition (board) {
    let marking = ""; 
    let count_marking = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j].getPlayerCell() === 0) {
                break;
            } else {
                if (j === 0) {
                    marking = board[i][j].getPlayerCell().marking
                    count_marking++;
                } else {
                    if (marking === board[i][j].getPlayerCell().marking) {
                        count_marking++;
                    } else {
                        break;
                    }
                }

            }
        }

        if (count_marking === 3) {
            return true;
        } else {
            count_marking = 0;
        }
    }

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            if (board[i][j].getPlayerCell() === 0) {
                break;
            } else {
                if (i === 0) {
                    marking = board[i][j].getPlayerCell().marking
                    count_marking++;
                } else {
                    if (marking === board[i][j].getPlayerCell().marking) {
                        count_marking++;
                    } else {
                        break;
                    }
                }

            }
        }

        if (count_marking === 3) {
            return true;
        } else {
            count_marking = 0;
        }
    }

    for (let i = 0; i < 3; i++) {
        let j = i;
        if (board[i][j].getPlayerCell() === 0) {
            break;
        } else {
            if (j === 0) {
                marking = board[i][j].getPlayerCell().marking
                count_marking++;
            } else {
                if (marking === board[i][j].getPlayerCell().marking) {
                    count_marking++;
                } else {
                    break;
                }
                
                j--;
            }
        }

        if (i === 2) {
            if (count_marking === 3) {
                return true;
            } else {
                count_marking = 0;
            }
        }
    }

    let j = 2;
    for (let i = 0; i < 3; i++) {
        if (board[i][j].getPlayerCell() === 0) {
            break;
        } else {
            if (j === 2) {
                marking = board[i][j].getPlayerCell().marking
                count_marking++;
            } else {
                if (marking === board[i][j].getPlayerCell().marking) {
                    count_marking++;
                } else {
                    break;
                }
            }

            j--;
        }
        
        if (i === 2) {
            if (count_marking === 3) {
                return true;
            } else {
                count_marking = 0;
            }
        }
    }

    return false;
}



