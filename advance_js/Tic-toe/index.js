var player1;
var player2;

let p1Count=0;
let p2Count=0;
//generators are not
const player_X = "X";
const player_O = "O";
let winner;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const P1_combinations = [];
const P2_combinations = [];
var count = 0;
let is_player2_turn = false;
let cellElements = document.querySelectorAll("[data-cell]");
const winningMessage = document.getElementsByClassName("winningMessageText");
const restartBtn = document.getElementById("restartBtn");
const boardElement=document.getElementById('board')
const winningMessageElement=document.getElementById('winningMessage')

const playerChoice = (e) => {
  const p1 = e.target.value;
  player1 = p1;
  player1 === player_O ? (player2 = player_X) : (player2 = player_O);
};

const RestartGame=()=>{
  let wm=document.getElementById('winningMessage')
  let wmt = document.getElementsByClassName("winningMessageText")[0]
  if(winner ===player1 || winner ===player2){
    wmt.innerHTML=`Player ${winner} wins the game`
  }else{
    wmt.innerHTML='It\'s a draw'
  }
  wm.style.display='flex'
  RemoveSymbolsfromGrid()
}
const RemoveSymbolsfromGrid=()=>{
  const cellElement=document.querySelectorAll('.cell')
  cellElement.forEach((cell)=>{
         cell.classList.remove('circle')
         cell.classList.remove('x')
  })
  
}
const startGame=(e)=>{
  const wm=document.getElementById('winningMessage')
  wm.style.display='none'
  window.location.reload(true)

}

const placeMark = (cell, isPlayer2,player) => {
    is_player2_turn=isPlayer2
  }

const isDraw=()=>{
  const cellElement=document.querySelectorAll('.cell')
    return [...cellElement].every(cell => {
      return cell.classList.contains(player_X) || cell.classList.contains(player_O)
    })
}

const endGame=(draw)=>{
  console.log(draw)
   if(draw){
    alert("It's a draw!");
   }
   else{
     alert(`player ${winner} wins`)
   }
   RestartGame()
}

const isMatchedPlayer=(subarray)=>{
    p1Count =0;
    p2Count=0
    for(const element of P1_combinations){
      if(subarray.includes(+element)){
        p1Count++
      }
    }
    for(const element of P2_combinations){
      if(subarray.includes(+element)){
        p2Count++
      }
    }
    if(p1Count==3){
      return 'player1'
    }else if(p2Count===3){
      return 'player2'
    }
    else{
      return false
    }
    
}
const findWinnerPlayer=(wc)=>{
   for(const subarray of wc){
    const isFound=isMatchedPlayer(subarray)
    if(isFound==='player1'){
      winner=player1
      break
    }else if(isFound==='player2'){
      winner=player2
      break
    }
   }
   if(!winner && count>=8)
   {
    return false
   }
   return winner
}

const checkWin = () => {
  let winnerPlayer=findWinnerPlayer(WINNING_COMBINATIONS)
  if(winner !== undefined && winnerPlayer !==undefined && count <= 8 )
  {
     return winnerPlayer
  }
  else if(winner !==undefined && count>=8){
      return false
  }
};

const handleCellClick = (e) => {
  const cell = e && e.target
  const index=e.target.getAttribute('data-cell')

  if (!is_player2_turn && player1 !== undefined ) { 
    if(e.target.innerHTML === player1 || e.target.innerHTML === 'player2')
    {
      return;
    }
    const board=document.getElementById('board');
    if(player1==='O') {
      board.classList.add('circle')
      cell.classList.add('circle')
    } else{
      board.classList.add('x')
      cell.classList.add('x')
    }
    placeMark(cell,true,player1)
     P1_combinations.push(index) ;
    count++
  }
  else if (player2 !== undefined) {
    if(e.target.innerHTML === player1 || e.target.innerHTML === 'player2')
    {
      return;
    }
    const board=document.getElementById('board');
    if(player2==='O') {
      board.classList.add('circle')
      cell.classList.add('circle')
    } else{
      board.classList.add('x')
      cell.classList.add('x')
    }
    P2_combinations.push(index)
    placeMark(cell,false,player2)
    count++
  }
  else{
    alert('select the symbol of your choice to play the game')
  }
  //check for winner or tie

  if(count>=5){
    if(checkWin())
    {
      console.log(checkWin())
      endGame(false)
    }else if(count>=8 && !checkWin()){
      endGame(true)
    }
    console.log(count,checkWin())
  }
};

