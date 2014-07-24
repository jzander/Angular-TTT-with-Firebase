var TTTApp = angular.module('TTTApp', ["firebase"]);

TTTApp.controller('TTTController', function ($scope, $firebase) {

  var TTTRef = new Firebase("https://angulartoetactic.firebaseIO.com/") ;

  $scope.clickCounter = $firebase(new Firebase("https://angulartoetactic.firebaseio.com/clickCounter"));
//   $scope.clickCounter.$add({clickCount:0});

  $scope.clickCount = 0 ; // <------ number of clicks reset after new game?
//  $scope.gamesPlayed = 0 ; //<----- number of games played at start of game.
  
  $scope.remoteCellList = 
  	$firebase(new Firebase("https://angulartoetactic.firebaseIO.com/remoteCellList")) ;
  

  $scope.testString = "Angular source, App, and Controller present" ;

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

$scope.remoteCellList.$bind($scope, "cellList");

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
  
$scope.p1 = []; //giving each player an empty array to store moves.
$scope.p2 = [];

	$scope.$watch('cellList', function() {
		console.log('model changed!') ;
	}) ;

  $scope.testJS = function() { 
    console.log('Correctly accessing JS function.') ; 
  } ;

 
  $scope.playerPicks = function(thisCell) { 
  		if ( thisCell.status == "X" || thisCell.status == "O" )
  	  		return;	 //if a cell has a status of X or O, exit the function and render the box unclickable and unchangeable until next game.
  		  			
		if ($scope.clickCount %2!=0 || $scope.p2.length < $scope.p1.length){ //every even move is O's turn
			thisCell.status = "O" ;
			thisCell.player = "p2"; // O is player two
			$scope.p2.push(thisCell.cellId); // put the unique ID number for the chosen cell into p2's array.
			console.log(thisCell.status, thisCell.cellId, thisCell.player, $scope.p1, $scope.p2);
		}
			
		else {
			thisCell.status = "X" ; //all other moves are X's.
			thisCell.player = "p1"; // X is player one.
			$scope.p1.push(thisCell.cellId); // put the unique ID number for the chosen cell into p1's array.
			console.log(thisCell.status, thisCell.cellId, thisCell.player, $scope.p1, $scope.p2);
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
						for(var k = 0; k < $scope.p1.length; ++k){
							if($scope.p1[k] == winOptions[i][j]) {
								if ((++xPlays) == 3)
								console.log('X wins');
								//insert inner html XWINS!
								//push win to scoreboard.
								//show play again screen.
								
							}
						}
						
						for(var k = 0; k < $scope.p2.length; ++k){
							if($scope.p2[k] == winOptions[i][j]) {
								if ((++oPlays) == 3)
								console.log('O wins');
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
  





	
	

