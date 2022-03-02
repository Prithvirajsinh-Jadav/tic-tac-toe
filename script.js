let currentTurn = "X"
let boxes = document.querySelectorAll(".box");
let turnText = document.getElementsByClassName("info")[0];
let winnerText = document.getElementsByClassName("winner-text")[0];
let isGameOver = false;
let isWin = false;
let winnerInfo = document.getElementsByClassName("winner-info")[0];
let turns = 0;
let xMatch = 0;
let oMatch = 0;
let drawMatch = 0;
let stack = []
const changeTurn = () => {
    return currentTurn === "X" ? "0" : "X"
}

const isWinner = () => {

    let boxText = document.getElementsByClassName("boxText");
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    wins.forEach(e => {

        if( (boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[1]].innerText === boxText[e[2]].innerText) && (boxText[e[0]].innerText !== "")){
            winnerText.innerHTML =  boxText[e[0]].innerText + " Won";

            if(boxText[e[0]].innerText === "X"){
                xMatch++;
            }
            else if(boxText[e[0]].innerText === "0"){
                oMatch++;
            }
            winnerInfo.innerText = `X won = ${xMatch}    O won = ${oMatch}    MatchDraw = ${drawMatch}`
            // console.log(winnerText);
            winnerText.classList.add("show");
            winnerText.classList.remove("hide");
            turnText.classList.add("hide");
            turnText.classList.remove("show");
            // console.log("i m winner")
            isGameOver = true;
            isWin = true;
            
            reset();
           
                
        }
    })

    if (turns == 9) {
        winnerText.innerText = "Match is draw";
        drawMatch++;
        winnerInfo.innerText = `X won = ${xMatch}    O won = ${oMatch}    MatchDraw = ${drawMatch}` 
        drawMatch += 1;
        winnerText.classList.add("show");
        winnerText.classList.remove("hide");
        turnText.classList.add("hide");
        turnText.classList.remove("show");
        reset();
        isWin = true;
    }  
    
}

boxes.forEach((e)=>{
        // e.classList.add("clicked");
        e.addEventListener("click",()=>{
            // e.classList.remove("clicked");

            if ( e.classList.contains("clicked") ){
                e.classList.remove("clicked");
                // console.log(e.id);
                stack.push(e.id);
                turns++;
                e.innerHTML = `<span class="boxText">${currentTurn}</span>`;
                // console.log(e.innerHTML);
                currentTurn = changeTurn();
                
                // e.classList.add("clicked"); 
                // e.classList.add("clicked")
                if(isWin){
                    // console.log("i m exe")
                    winnerText.classList.add("hide");
                    winnerText.classList.remove("show");
                    turnText.classList.add("show");
                    turnText.classList.remove("hide");
                    isWin = false;
            
                }
            
                if(!isGameOver){
                    turnText.innerHTML = "Turn for " + currentTurn;
                }
            
                isWinner();
            }
            
        })
})

const reset = () => {

        turns = 0;

        boxes.forEach((e) => {
            e.classList.add("clicked");
        })

        let boxText = document.querySelectorAll(".boxText");
        boxText.forEach((e) => {
            e.innerHTML = "";
        })
        // winnerText.classList.remove("show");

        currentTurn = "X";
        isGameOver = false;
        if(!isGameOver){
            turnText.innerHTML = "Turn for " + currentTurn;
        }    
}
reset();

winnerInfo.innerText = `X won = ${xMatch}    O won = ${oMatch}    MatchDraw = ${drawMatch}`

const undo = () => {
    if(stack.length <= 0){
        alert("Pls start game first")
    }
    else{
        
        let x = document.getElementById(stack.pop())
        x.innerHTML = '<span class="boxText"></span>'
       
    }
}