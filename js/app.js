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
  


  $scope.testJS = function() {
    console.log('Correctly accessing JS function.') ;
  } ;

 
  $scope.playerPicks = function(thisCell) {
	if ($scope.clickCount %2!=0){ 
		thisCell.status = "O" ;
		thisCell.player = "p1";
		console.log(thisCell.status, thisCell.id, thisCell.player)
		}
		
	else {
		thisCell.status = "X" ;
		thisCell.player = "p2";
		console.log(thisCell.status, thisCell.id, thisCell.player)
		}
	
	
//	//when user selects box, it stays selected, box becomes locked.
//	
//	$scope.playGame = function(){
//		for (var i = 0; i < winOptions.length; i++){ 
//		var option = winOptions[i];
//		if(thisCell.status == "X")
//	
//		
//		//if box has a class of xclass keep it x.
//		//if a box has a class of yclass, keep it y.
//		//check for a win combo after each box selection.
//		//declare a winner.
//	}   
//	
//	}
//	
	
	

	
//	
//	
//	}
	
	
//
//    console.log("Cell was: " + thisCell.status) ;
//    thisCell.status = "X" ;
//    console.log("Cell is now: " + thisCell.status) ;

//    console.log($scope.clickCount) ;
    $scope.clickCount = $scope.clickCount + 1 ;
    
//    console.log(TTTRef.clickCounter);

    $scope.clickCounter.$set({clickCounter: $scope.clickCount}) ;
  } ;
  




//insert after game has been won ----> $scope.gamesPlayed += 1;
	
	

}) ;