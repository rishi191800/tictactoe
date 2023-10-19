let gameInfo = document.getElementById('gameInfo');
let boxes = document.querySelectorAll('.box');
let btn = document.getElementById('btn');
// let box1 = document.querySelectorAll('.box1');
// let box2 = document.querySelectorAll('.box2');
// let box3 = document.querySelectorAll('.box3');
// let box4 = document.querySelectorAll('.box4');
// let box5 = document.querySelectorAll('.box5');
// let box6 = document.querySelectorAll('.box6');
// let box7 = document.querySelectorAll('.box7');
// let box8 = document.querySelectorAll('.box8');
// let box9 = document.querySelectorAll('.box9');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index)=>{
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove('win');
    });
    btn.classList.add('vanish');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let ans = "";
    winningPositions.forEach((index) =>{
        if((gameGrid[index[0]] !== "" || gameGrid[index[1]] !== "" || gameGrid[index[2]] !== "") && (gameGrid[index[0]] === gameGrid[index[1]]) && (gameGrid[index[1]] == gameGrid[index[2]])){
            if(gameGrid[index[0]] === "X"){
                ans = "X";
            }
            else{
                ans = "O";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            });
            boxes[index[0]].classList.add('win');
            boxes[index[1]].classList.add('win');
            boxes[index[2]].classList.add('win');
            if(ans !== ""){
                gameInfo.innerText = `Winner is - ${ans}`;
                btn.classList.remove("vanish");
                return;
            }
        }
    });

    let count = 0;

    gameGrid.forEach((index)=>{
        if(index != ""){
            count++;
            console.log(count);
        }
    })
    if(count == 9){
        gameInfo.innerText = "Match Draw";
        btn.classList.remove("vanish");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentPlayer;
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    });
});

btn.addEventListener('click', initGame);