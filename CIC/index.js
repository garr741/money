var app = angular.module('CompoundInterestCalculator', ['n3-line-chart']);

app.controller('CICController', ['$scope', function($scope) {
	$scope.title = "Compound Interest Calculator";
	$scope.FV = function(){
		var r = ($scope.r/100);
		return $scope.P*(Math.pow((1+r), $scope.y)) + $scope.c*((Math.pow((1+r), $scope.y+1) - (1+r))/r);
	}	
}]);
