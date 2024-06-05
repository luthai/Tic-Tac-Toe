"use strict";

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
    const player1 = createPlayer("one", "X");
    const player2 = createPlayer("two", "O");
    
    let board = Gameboard();
   
    let turn = 0;
    let activePlayer;
    let check_win = false;
    while (turn < 9) {
        if (turn % 2 === 0) {
            activePlayer = player1;
        }
        else {
            activePlayer = player2;
        }

        let coord_x = prompt("x: ");
        let coord_y = prompt("y: ");

        board.setMarking([coord_x, coord_y], activePlayer);

        printBoard(board.getBoard());

        if (turn > 4) {
            check_win = winCondition(board.getBoard());
        }

        if (check_win == true) {
            console.log(`Player ${activePlayer.name} have won.`)
            return;
        }

        turn++;
    }

    console.log("No winner in Tic-Tac-Toe!");
}

//playGame();

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

    count_marking = 0;
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

    count_marking = 0;
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
                }j--;
                count_marking = 0;
            }
        }
    }

    count_marking = 0;
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



