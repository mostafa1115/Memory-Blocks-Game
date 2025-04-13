// Start Game Settings 
const startBtn = document.querySelector(".start-game") as HTMLElement;
const gameContainer = document.querySelector(".game-container") as HTMLElement;
const nameMessage = document.querySelector(".name") as HTMLElement;
const Tries = document.querySelector(".tries") as HTMLElement;
const GameArea = document.querySelector(".game-area") as HTMLElement;
const duration:number = 1000;
let wrongTriees:number = 0;
let True :number= 0;
let RestartGame:Boolean = false;
let allFlippedBlocks : HTMLElement[] = [];


startBtn?.addEventListener("click",() => {
        if (RestartGame == false) {
            const username = prompt("Please Enter Your Name");
            document.body.style.backgroundColor = "white";
            gameContainer.style.opacity = "1";
            startBtn.style.display = "none";
            gameContainer.classList.remove("stop-clicking");
            if (username != null) {
                nameMessage.innerText = username.toUpperCase();
            }
        } else {
            location.reload();
        }
    }
)
// Create the game cards
const numberOfCards : number= 20;
let Cards : string[] = ["fa-brands fa-github" , "fa-brands fa-github" , "fa-brands fa-python" , "fa-brands fa-python",
    "fa-brands fa-js","fa-brands fa-js","fa-brands fa-html5","fa-brands fa-html5","fa-brands fa-css","fa-brands fa-css",
    "fa-solid fa-robot","fa-solid fa-robot","fa-solid fa-file","fa-solid fa-file","fa-solid fa-envelope","fa-solid fa-envelope",
    "fa-solid fa-image","fa-solid fa-image","fa-solid fa-cloud","fa-solid fa-cloud"
];
for(let i = 0 ; i < numberOfCards ; ++i){
let GetrandIcon :number = Math.floor(Math.random() * Cards.length);
let cardValue = Cards[GetrandIcon];
Cards.splice(GetrandIcon,1);
let CardDiv = document.createElement("div");
let backFace = document.createElement("div");
backFace.classList.add("back");
let cardIcon = document.createElement("i");
cardIcon.classList.add(...cardValue.split(" "));
backFace.appendChild(cardIcon)


let frontFace = document.createElement("div");
frontFace.classList.add("front");
frontFace.textContent = "?";

CardDiv.appendChild(backFace);
CardDiv.appendChild(frontFace);
CardDiv.classList.add("card");

CardDiv.addEventListener("click" ,() => {
    flipCards(CardDiv);
});
GameArea.appendChild(CardDiv);

} 
// Flip cards function
const blocks = Array.from(GameArea.children) ;
function flipCards(SelectedBlock : HTMLElement ):void{
    SelectedBlock.classList.add("flipped");
    // Get all the flipped cards
    allFlippedBlocks.push(SelectedBlock);
    if(allFlippedBlocks.length === 2) {

        // Stop clicking 
        stopClicking();
        // Check the cards
        CheckCards();
    }
}  // Stop clicking function
function stopClicking(){
    GameArea.classList.add("stop-clicking");
    setTimeout(() => {
        GameArea.classList.remove("stop-clicking");
    }, duration);
} // Check the cards function
function CheckCards(){
    let firstIcon  = allFlippedBlocks[0].querySelector(".back i") as HTMLElement;
    let secondIcon = allFlippedBlocks[1].querySelector(".back i") as HTMLElement;
    const firstClass = Array.from(firstIcon.classList).find(cli => cli.startsWith("fa-") && cli !== "fa-brands" && cli !== "fa-solid");
    const secondClass = Array.from(secondIcon.classList).find(cli => cli.startsWith("fa-") && cli !== "fa-brands" && cli !== "fa-solid");
    // If cards True
    if(firstClass === secondClass){
        allFlippedBlocks[0].classList.add("matched");
        allFlippedBlocks[1].classList.add("matched");
        allFlippedBlocks = [];
        ++True;
        handleWin();
    } // If cards false
    else {
        setTimeout(() => {
            allFlippedBlocks[0].classList.remove("flipped");
            allFlippedBlocks[1].classList.remove("flipped");
            allFlippedBlocks = [];
            ++wrongTriees;
            Tries.textContent = wrongTriees.toString();
        }, duration);
    } console.log(allFlippedBlocks);
} // Win Handling
function handleWin():void{
    if(True === 10){
        startBtn.textContent = "You Win!!!!";
        startBtn.style.backgroundColor= "#cfcf00";
        startBtn.style.fontSize = "50px";
        startBtn.style.display = "block";
        document.body.style.backgroundColor = "rgb(43, 199, 171);";
        gameContainer.style.opacity = "0.5";
        RestartGame = true;
    }
}

