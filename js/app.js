var TTTApp = angular.module('TTTApp', ["firebase"]);

//TTTApp.controller('UserCtrl', ['$scope' function ($scope) {
//
//	$scope.p1Name = '';
//	$scope.p1Name = '';
//
//}]);



TTTApp.controller('TTTController', function ($scope, $firebase) {

 

  $scope.clickCounter = $firebase(new Firebase("https://tictacgo.firebaseio.com/clickCounter"));
//   $scope.clickCounter.$add({clickCount:0});

  $scope.clickCount = 0 ;
  $scope.newGame = "YES";
  $scope.winScreen = false;

//  $scope.playGame = true;
   // <------ number of clicks reset after new game?
//  $scope.gamesPlayed = 0 ; //<----- number of games played at start of game.
  
  $scope.remoteCellListContainer = 
  	$firebase(new Firebase("https://tictacgo.firebaseio.com/remoteCellListContainer")) ;
  	
//  $scope.newGame = $firebase(new Firebase("https://tictacgo.firebaseio.com/newGame")) ;
//  


  $scope.testString = "Angular source, App, and Controller present" ;



	
//	$scope.endScreen = function () {
//		$scope.winxScreen = false;
//		$scope.winoScreen = false;
//		$scope.newGame = true;
//		$scope.cellList = [ // each individual cell with a unique ID.
//				{status: "A", cellId:0}, 
//				{status: "B", cellId:1}, 
//				{status: "C", cellId:2}, 
//				{status: "D", cellId:3}, 
//				{status: "E", cellId:4}, 
//				{status: "F", cellId:5}, 
//				{status: "G", cellId:6}, 
//				{status: "H", cellId:7}, 
//				{status: "I", cellId:8}
//			]  ;
//		console.log($scope.cellList);	
//	}
	


  $scope.cellList = [ // each individual cell with a unique ID.
		{status: "A", cellId:0}, 
		{status: "B", cellId:1}, 
		{status: "C", cellId:2}, 
		{status: "D", cellId:3}, 
		{status: "E", cellId:4}, 
		{status: "F", cellId:5}, 
		{status: "G", cellId:6}, 
		{status: "H", cellId:7}, 
		{status: "I", cellId:8}
	]  ;

	$scope.p1 = ["z"]; //giving each player an array to store moves.
	$scope.p2 = ["z"];



$scope.cellListContainer = {
	firstScreen: $scope.newGame,
	cellListArray: $scope.cellList,
	p1Array: $scope.p1,
	p2Array: $scope.p2
	} ; 

//object inside {} with one property> CellListArray

$scope.remoteCellListContainer.$bind($scope, "cellListContainer");

//Firebase.enableLogging(true)

var winOptions = [ // all possible winning combinations.
	  [0,1,2],
	  [3,4,5],
	  [6,7,8],
	  [0,4,8],
	  [2,4,6],
	  [0,3,6],
	  [1,4,7],
	  [2,5,8]
  ];
  


	$scope.$watch('cellListContainer',  function() {
		console.log('model changed!') ;
	}) ;

  $scope.testJS = function() { 
    console.log('Correctly accessing JS function.') ; 
  } ;
  
  $scope.startScreen = function () {
  	$scope.cellListContainer.firstScreen = "NO";
  	console.log($scope.cellListContainer.firstScreen);
  }

 
  $scope.playerPicks = function(thisCell) { 
  		if ( thisCell.status == "X" || thisCell.status == "O" )
  	  		return;	 //if a cell has a status of X or O, exit the function and render the box unclickable and unchangeable until next game.
  		
  		playerOneArray = $scope.cellListContainer.p1Array;
  		playerTwoArray = $scope.cellListContainer.p2Array;
  		  			
		if (playerTwoArray.length < playerOneArray.length){ //every even move is O's turn
			thisCell.status = "O" ;
			thisCell.player = "p2"; // O is player two
			playerTwoArray.push(thisCell.cellId); // put the unique ID number for the chosen cell into p2's array.
			console.log(thisCell.status, thisCell.cellId, thisCell.player, playerOneArray, playerTwoArray);
		}
			
		else {
			thisCell.status = "X" ; //all other moves are X's.
			thisCell.player = "p1"; // X is player one.
			playerOneArray.push(thisCell.cellId); // put the unique ID number for the chosen cell into p1's array.
			console.log(thisCell.status, thisCell.cellId, thisCell.player, playerOneArray, playerTwoArray);
		}
		
		$scope.winCheck(); //run the wincheck function after each turn.
			
		$scope.clickCount = $scope.clickCount + 1 ;    
		$scope.clickCounter.$set({clickCounter: $scope.clickCount}) ;
	} ;

		$scope.winCheck = function() { //this is the win logic
			for (var i = 0; i < winOptions.length; i++) { //after 5 plays and every turn thereafter run this loop: 
				var xPlays = 0;
				var oPlays = 0;
					for (var j = 0; j < winOptions[i].length; j++) { 
						for(var k = 0; k < playerOneArray.length; ++k){
							if(playerOneArray[k] == winOptions[i][j]) {
								if ((++xPlays) == 3)
								$scope.winxScreen = true;
								
//								$scope.playGame = true;
								//insert inner html XWINS!
								//push win to scoreboard.
								//show play again screen.
								
							}
						}
						
						for(var k = 0; k < $scope.cellListContainer.p2Array.length; ++k){
							if(playerTwoArray[k] == winOptions[i][j]) {
								if ((++oPlays) == 3)
								$scope.winoScreen = true;
//								$scope.playGame = true;
								//insert inner html OWINS!
								//push win to scoreboard.
								//show play again screen.
								
							}
						}
					
					
					
					}
			}
		};
		
}) ;	// END OF CONTROLLER
				
	
//		//after 5 moves, check for winner.
//	    //when user selects box, it stays selected, box becomes locked.	//if box has a class of xclass keep it x.
//		//if a box has a class of yclass, keep it y.
//		//check for a win combo after each box selection.
//		//declare a winner.	
//		
//	
//	}   
//	
//	}
//	
	
	
//	if {
//		thisCell.status = "X" || thisCell.status = "O"; }
	
//	
//	
//	}

//insert after game has been won ----> $scope.gamesPlayed += 1;
  





	
	

