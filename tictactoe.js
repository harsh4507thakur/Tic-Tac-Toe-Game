
let boxes = document.querySelectorAll('.box');
let resetButton = document.getElementById('reset');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg'); 
    let turnO = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turnO){
            box.style.color = "red";
            box.innerText = "O";
            turnO = false;
        } else {
            box.style.color="black";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();

    });
});

const disableBoxes = () => {
     for (let box of boxes){
        box.disabled = true;
    }
};
 
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText = "";
        msgContainer.classList.add("hide");
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
}

const showWinner = (winner) => {
msg.innerText = `Congratulations, the winner is ${winner}`;
msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    let winnerFound = false;

    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos1 === pos2 && pos2 === pos3){
            showWinner(pos1);
            disableBoxes();
            winnerFound = true;
            break; // winner mil gaya, loop break
        }
    }

    // Check for draw if no winner
    if(!winnerFound){
        let allFilled = true;
        for(let box of boxes){
            if(box.innerText === ""){
                allFilled = false;
                break;
            }
        }
        if(allFilled){
            msg.innerText = "It's a draw! No winner this time.";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetButton.addEventListener("click",resetGame);


