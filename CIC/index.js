var app = angular.module('CompoundInterestCalculator', ['chart.js']);

app.controller('CICController', ['$scope', function($scope) {
    $scope.title = "Compound Interest Calculator";
    $scope.FV = function(P, r, y, c) {
        r = (r / 100);
        return P * (Math.pow((1 + r), y)) + c * ((Math.pow((1 + r), y + 1) - (1 + r)) / r);
    }

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [30, 50, 10];

}]);
