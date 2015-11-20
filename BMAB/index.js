var app = angular.module('BuildMeABudget', []);


app.controller('BudgetController', ['$scope', 'Category', function($scope, Category){
	var income = $scope.PreTaxIncome;
	var housingPercentage = 35;
	var utilitiesPercentage = 5;
	var transportationPercentage = 15;
	var foodPercentage = 10;
	var savingsPercentage = 10;
	var clothingPercentage = 5;
	var debtsPercentage = 10;
	var personalPercentage = 5;
	var medicalPercentage = 5;
	$scope.hint = false;
	$scope.totalPercentage = 100;
	$scope.expenses = [
		new Category("Housing", "mortgage / taxes / rent / insurance", housingPercentage, true, true, true, true),
		new Category("Utilities", "phone / cell phone / gas / cable / internet", utilitiesPercentage, true, true, true, true),
		new Category("Transportation", "bus / taxi / gas / insurance / maintenance / parking", transportationPercentage, true, true, true, true),
		new Category("Food", "groceries / personal care", foodPercentage, true, true, true, true),
		new Category("Clothing", "Shopping", clothingPercentage, true, true, true, true),
		new Category("Personal and Entertainment", "entertainment / recreation / alcohol / eating out / gaming / hair cuts / hobbies / amazon / netflix", personalPercentage, true, true, true, true),
		new Category("Health", "health care premiums / medications", medicalPercentage, true, true, true, true),
		new Category("Savings", "Savings / Emergency Fund / Retirement / Investments", savingsPercentage, true, true, true, true),
		new Category("Debts", "Loans / Credit Cards / Medical Bills", debtsPercentage, true, true, true, true)
	]

	$scope.PostTaxIncome = function(){
		if ( $scope.PreTaxIncome < 9225){
			return $scope.PreTaxIncome - ($scope.PreTaxIncome*.10);
		} else if ( $scope.PreTaxIncome < 37450 ){
			return $scope.PreTaxIncome - ($scope.PreTaxIncome*.15);
		} else if ( $scope.PreTaxIncome < 90750 ){
			return $scope.PreTaxIncome - ($scope.PreTaxIncome*.25);
		} else if ( $scope.PreTaxIncome < 189300 ){
			return $scope.PreTaxIncome - ($scope.PreTaxIncome*.28);
		} else if ( $scope.PreTaxIncome < 411350 ){
			return $scope.PreTaxIncome - ($scope.PreTaxIncome*.33);
		} else {
			return $scope.PreTaxIncome - ($scope.PreTaxIncome*.35);
		}
	}

	$scope.monthlyIncome = function (income){
		return income / 12;
	}

	$scope.biweeklyIncome = function (income){
		return income / 26;
	}

	$scope.yearly = function(income, percentage){
		return income * (percentage/100);
	}

	$scope.monthly = function(income, percentage){
		return $scope.yearly(income, percentage) / 12;
	};

	$scope.weekly = function(income, percentage){
		return $scope.yearly(income, percentage) / 52;
	};

	$scope.biweekly = function(income, percentage){
		return $scope.weekly(income, percentage) * 2;
	};

	$scope.increase = function(expense){
		expense.percentage += 1;
		totalExpenses();
	}

	$scope.decrease = function(expense){
		if ( expense.percentage == 0 ){
			return;
		}
		expense.percentage -= 1;
		totalExpenses();
	}

	var totalExpenses = function(){
		$scope.totalPercentage = 0;
		angular.forEach($scope.expenses, function(value, key){
			$scope.totalPercentage += value.percentage;
		});
	}

}]);