var app = angular.module('BuildMeABudget', ['firebase']);


app.controller('BudgetController', ['$scope','$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
    var ref = new Firebase("https://tylorgarrett.firebaseio.com");
    var childRef = ref.child("funfun");
    var tinyRef = childRef.child("tiny");
    var smallRef = childRef.child("small");
    var mediumRef = childRef.child("medium");
    var largeRef = childRef.child("large");
    var hugeRef = childRef.child("huge");

    var tinyFun = $firebaseArray(tinyRef);
    var smallFun = $firebaseArray(smallRef)
    var mediumFun = $firebaseArray(mediumRef)
    var largeFun = $firebaseArray(largeRef)
    var hugeFun = $firebaseArray(hugeRef)

    $scope.title = "Fun Fun";


    var tiny1 = $firebaseObject(tinyRef);
    var tinyUnwatch = tiny1.$watch(function() {
        $scope.tiny()
    });

    var small1 = $firebaseObject(smallRef);
    var smallUnwatch = small1.$watch(function() {
        $scope.small()
    });

    var medium1 = $firebaseObject(mediumRef);
    var mediumUnwatch = medium1.$watch(function() {
        $scope.medium()
    });

    var large1 = $firebaseObject(largeRef);
    var largeUnwatch = large1.$watch(function() {
        $scope.large()
    });

    var huge1 = $firebaseObject(hugeRef);
    var hugeUnwatch = huge1.$watch(function() {
        $scope.huge()
    });

    $scope.tinyPressed = function() {
        tinyFun.$add({data: 4});
    }

    $scope.smallPressed = function() {
        smallFun.$add({data: 4});
    }

    $scope.mediumPressed = function() {
        mediumFun.$add({data: 4});
    }

    $scope.largePressed = function() {
        largeFun.$add({data: 4});
    }

    $scope.hugePressed = function() {
        hugeFun.$add({data: 4});
    }

    $scope.tiny = function(){
        var audio = new Audio('sound/tiny.mp3');
        audio.play();
    }

    $scope.small = function(){
        var audio = new Audio('sound/small.mp3');
        audio.play();
    }

    $scope.medium = function(){
        var audio = new Audio('sound/medium.mp3');
        audio.play();
    }

    $scope.large = function(){
        var audio = new Audio('sound/large.mp3');
        audio.play();
    }

    $scope.huge = function(){
        var audio = new Audio('sound/huge.mp3');
        audio.play();
    }


    

}]);
