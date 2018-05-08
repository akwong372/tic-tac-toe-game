$( document ).ready(function() { 
  
  var $movesTracker = [];
  var $aiMovesTracker = [];
  var $gameWon = 0;
  var $aiGameWon = 0;
  var $aiPieces = '';
  var $playerPieces = '';
  const winCombo =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  const cells = document.querySelectorAll('.cell');
  var originalBoard = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  
  
  $("#x").click(function(){
    if ($aiPieces === '' && $playerPieces === ''){
      $("#x").addClass("selected");
      $("#x").removeClass("selection-buttons");
      $aiPieces = "O";
      $playerPieces = "X";
      }
    })
  
   $("#o").click(function(){
     if ($aiPieces === '' && $playerPieces === ''){
      $("#o").addClass("selected");
      $("#o").removeClass("selection-buttons");
      $aiPieces = "X";
      $playerPieces = "O";
       }
    })
  
  
  function comboLoop (winCombo){
    for(var i = 0; i<winCombo.length; i++){
      if ($movesTracker.sort().join('') == winCombo[i].join('') || winCombo[i].every(function (val) { return $movesTracker.indexOf(val) >= 0; })){
         $(".endgame").css("display", "block");
        $gameWon = 1;
      } else if ($aiMovesTracker.sort().join('') == winCombo[i].join('') || winCombo[i].every(function (val) { return $aiMovesTracker.indexOf(val) >= 0; })){
         $("#winMessage").text("Heh, nice try, kid. *Teleports behind you*");
         $(".endgame").css("display", "block");
        $gameWon = 1;
        } 
    }
  }
  
  function aiMove(){
    var filteredBoard = originalBoard.filter(entry => entry !== '')
    var randMove = filteredBoard[Math.floor(Math.random() * filteredBoard.length)];
    if ($gameWon !== 1){
       $('#'+randMove).text($aiPieces);
      $aiMovesTracker.push(Number(randMove));
      originalBoard.splice(randMove,1, '');
    }
  }

    $(".grid").click(function(){
      var $this = $(this)
      if ($this.text() !== "X" && $this.text() !== "O" && $playerPieces !== ''){
        $this.text($playerPieces);
        $movesTracker.push(Number(this.id));
        originalBoard.splice(Number(this.id),1, '');
        aiMove();
        comboLoop(winCombo);
        
         }
       })
      
      $("#reset").click(function(){
         for (var i = 0; i<cells.length; i++){
           cells[i].innerText = "\u00A0";
         }
         $("#x").removeClass("selected");
         $("#x").addClass("selection-buttons");
         $("#o").removeClass("selected");
         $("#o").addClass("selection-buttons");
         $playerPieces = '';
         $aiPieces = '';
         $gameWon = 0;
         $aiGameWon = 0;
         $movesTracker = [];
         $aiMovesTracker = [];
         originalBoard = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
         $(".endgame").css("display", "none");
         $("#winMessage").text("You Are Winner");
       })
  
});