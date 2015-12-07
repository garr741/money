var app = angular.module('CompoundInterestCalculator', ['chart.js']);

app.controller('CICController', ['$scope', '$filter', function($scope, $filter) {
    $scope.title = "Compound Interest Calculator";

    Chart.defaults.global.colours = [
        '#46BFBD', // green
        '#F7464A', // red
    ];

    $scope.FV = function(P, r, y, c) {
        return futureValue(P, r, y, c);
    }

    var futureValue = function(P, r, y, c) {
        r = (r / 100);
        var result = P * (Math.pow((1 + r), y)) + c * ((Math.pow((1 + r), y + 1) - (1 + r)) / r);
        //return $filter('number')(result, 2);
        return Math.floor(result);
    }

    $scope.YearList = [0, 1, 2, 3, 4];
    $scope.AmountInvestedList = [0];
    $scope.TotalAmountList = [0];

    $scope.labels = $scope.YearList;
    $scope.series = ['Total Amount', 'Amount Invested'];
    $scope.data = [$scope.TotalAmountList, $scope.AmountInvestedList]

    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };

    var listOfTotalAmountInvested = function() {
        var results = [];
        for (var i = 0; i <= $scope.y; i++) {
            results.push($scope.c * i);
        };
        return results;
    }

    var listOfYears = function() {
        var results = [];
        var a = $scope.y;
        for (var i = 1; i <= a + 1; i++) {
            results.push(i)
        }
        return results;
    }

    var listOfTotalAmount = function() {
        var results = [];
        for (var i = 0; i <= $scope.y; i++) {
            results.push(futureValue($scope.P, $scope.r, i, $scope.c))
        }
        return results;
    }

    $scope.$watch('r', function(newValue, oldValue) {
        updateGraphInfo()
    });

    $scope.$watch('y', function(newValue, oldValue) {
        updateGraphInfo()
    });

    $scope.$watch('c', function(newValue, oldValue) {
        updateGraphInfo()
    });

    var updateGraphInfo = function() {
        $scope.data = [listOfTotalAmount(), listOfTotalAmountInvested()];
        $scope.labels = listOfYears();
    }

}]);
