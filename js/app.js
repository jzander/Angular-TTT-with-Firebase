var TTTApp = angular.module('TTTApp', ["firebase"]);

TTTApp.controller('TTTController', function ($scope, $firebase) {

  var TTTRef = new Firebase("https://torid-fire-6779.firebaseio.com/") ;

  $scope.clickCounter = $firebase(new Firebase("https://torid-fire-6779.firebaseio.com/" + '/clickCounter'));
//   $scope.clickCounter.$add({clickCount:0});

  $scope.clickCount = 0 ; // <------ number of clicks reset after new game?
//  $scope.gamesPlayed = 0 ; //<----- number of games played at start of game.
  

  $scope.testString = "Angular source, App, and Controller present" ;

  $scope.cellList = [
		{status: "A", id:0}, 
		{status: "B", id:1}, 
		{status: "C", id:2}, 
		{status: "D", id:3}, 
		{status: "E", id:4}, 
		{status: "F", id:5}, 
		{status: "G", id:6}, 
		{status: "H", id:7}, 
		{status: "I", id:8}
	]  ;

var winOptions = [
	  [0,1,2],
	  [3,4,5],
	  [6,7,8],
	  [0,4,8],
	  [2,4,6],
	  [0,3,6],
	  [1,4,7],
	  [2,5,8]
  ];
  
$scope.p1 = [];
$scope.p2 = [];

  $scope.testJS = function() {
    console.log('Correctly accessing JS function.') ;
  } ;

 
  $scope.playerPicks = function(thisCell) {
  		if ( thisCell.status == "X" || thisCell.status == "O" )
  	  		return;	
  		  			
		if ($scope.clickCount %2!=0){ 
			thisCell.status = "O" ;
			thisCell.player = "p2";
			$scope.p2.push(thisCell.id);
			console.log(thisCell.status, thisCell.id, thisCell.player, $scope.p1, $scope.p2);
		}
			
		else {
			thisCell.status = "X" ;
			thisCell.player = "p1";
			$scope.p1.push(thisCell.id);
			console.log(thisCell.status, thisCell.id, thisCell.player, $scope.p1, $scope.p2);
		}
		
		$scope.winCheck();
			
		$scope.clickCount = $scope.clickCount + 1 ;    
		$scope.clickCounter.$set({clickCounter: $scope.clickCount}) ;
	} ;

		$scope.winCheck = function() {
			for (var i = 0; i < winOptions.length; i++) {
				var xPlays = 0;
				var oPlays = 0;
					for (var j = 0; j < winOptions[i].length; j++) {
						for(var k = 0; k < $scope.p1.length; ++k){
							if($scope.p1[k] == winOptions[i][j]) {
								if ((++xPlays) == 3)
								console.log('X wins');
								
							}
						}
						
						for(var k = 0; k < $scope.p2.length; ++k){
							if($scope.p2[k] == winOptions[i][j]) {
								if ((++oPlays) == 3)
								console.log('O wins');
								
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
  





	
	

