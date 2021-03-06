var app = angular.module('BuildMeABudget', ['chart.js', 'firebase']);


app.controller('BudgetController', ['$scope', 'Category','$firebaseObject', '$firebaseArray', function($scope, Category, $firebaseObject, $firebaseArray) {
    var ref = new Firebase("https://tylorgarrett.firebaseio.com");
    var childRef = ref.child("BMAB");

    var userData = $firebaseArray(childRef);

    var income = $scope.PreTaxIncome;
    var housingPercentage = 30;
    var utilitiesPercentage = 10;
    var transportationPercentage = 15;
    var foodPercentage = 10;
    var savingsPercentage = 10;
    var debtsPercentage = 10;
    var personalPercentage = 10;
    var medicalPercentage = 5;

    $scope.SaveUserInfo = function(UserID){
        var userFound = false;
        userData.map(function(obj, index){
            if (obj.id == UserID){
                userFound = true;
                saveData(UserID, obj, index);
            }
        })
        if ( userFound ){
            return;
        }
        userData.$add({
            id: UserID,
            income: $scope.PreTaxIncome,
            h: housing.getPercentage(),
            u: utilities.getPercentage(),
            t: transportation.getPercentage(),
            f: food.getPercentage(),
            s: savings.getPercentage(),
            d: debts.getPercentage(),
            p: personal.getPercentage(),
            m: health.getPercentage()
        }).then(function(ref){
            $scope.results = "has-success";
            $scope.feedback  = "glyphicon-ok";
        }, function(error){
            $scope.results = "has-error";
            $scope.feedback  = "glyphicon-remove";
        });
    }

    $scope.GetUserInfoByID = function(UserID){
        var key = null;
        userData.map(function(obj){
            if ( obj.id == UserID ){
                key = obj.$id;
                return;
            }
        });
        var obj = userData.$getRecord(key);
        if ( obj == null ){
            console.log("Data with that ID could not be found")
            $scope.results = "has-error";
            $scope.feedback  = "glyphicon-remove";
        } else {
            $scope.PreTaxIncome = obj.income;
            income = obj.income;
            housing.setPercentage(obj.h);
            utilities.setPercentage(obj.u);
            transportation.setPercentage(obj.t);
            food.setPercentage(obj.f);
            savings.setPercentage(obj.s);
            debts.setPercentage(obj.d);
            personal.setPercentage(obj.p);
            health.setPercentage(obj.m);
            updateListOfPercentages();
            console.log("Data updated")
        }
    }

    var saveData = function(UserID, obj, index){
        obj.id = UserID;
        obj.income = $scope.PreTaxIncome;
        obj.h = housing.getPercentage();
        obj.u = utilities.getPercentage();
        obj.t = transportation.getPercentage();
        obj.f = food.getPercentage();
        obj.s = savings.getPercentage();
        obj.d = debts.getPercentage();
        obj.p = personal.getPercentage();
        obj.m = health.getPercentage();
        userData.$save(index).then(function(ref){
            console.log(ref)
            $scope.results = "has-success";
            $scope.feedback  = "glyphicon-ok";
        }, function(error){
            console.log(error);
            $scope.results = "has-error";
            $scope.feedback  = "glyphicon-remove";
        });
    }

    var housing = new Category("Housing", "mortgage / taexs / rent / insurance", housingPercentage, true, true, true, true);
    var utilities = new Category("Utilities", "phone / electricity / gas / cable / internet / water", utilitiesPercentage, true, true, true, true);
    var transportation = new Category("Transportation", "bus / taxi / gas / insurance / maintenance / parking", transportationPercentage, true, true, true, true);
    var food = new Category("Food", "groceries / personal care", foodPercentage, true, true, true, true)
    var personal = new Category("Personal and Entertainment", "entertainment / recreation / alcohol / eating out / gaming / hair cuts / hobbies / amazon / netflix / shopping", personalPercentage, true, true, true, true)
    var health = new Category("Health", "health care premiums / medications", medicalPercentage, true, true, true, true)
    var savings = new Category("Savings", "Savings / Emergency Fund / Retirement / Investments", savingsPercentage, true, true, true, true)
    var debts = new Category("Debts", "Loans / Credit Cards / Medical Bills", debtsPercentage, true, true, true, true)

    $scope.hint = false;
    $scope.totalPercentage = 100;
    $scope.expenses = [
        housing,
        utilities,
        transportation,
        food,
        personal,
        health,
        savings,
        debts
    ]

    $scope.listOfPercentages = [housing.getPercentage(), utilities.getPercentage(), transportation.getPercentage(), food.getPercentage(), personal.getPercentage(), health.getPercentage(), savings.getPercentage(), debts.getPercentage()];

    $scope.PostTaxIncome = function() {
        if ($scope.PreTaxIncome < 9225) {
            return $scope.PreTaxIncome - ($scope.PreTaxIncome * .10);
        } else if ($scope.PreTaxIncome < 37450) {
            return $scope.PreTaxIncome - ($scope.PreTaxIncome * .15);
        } else if ($scope.PreTaxIncome < 90750) {
            return $scope.PreTaxIncome - ($scope.PreTaxIncome * .25);
        } else if ($scope.PreTaxIncome < 189300) {
            return $scope.PreTaxIncome - ($scope.PreTaxIncome * .28);
        } else if ($scope.PreTaxIncome < 411350) {
            return $scope.PreTaxIncome - ($scope.PreTaxIncome * .33);
        } else {
            return $scope.PreTaxIncome - ($scope.PreTaxIncome * .35);
        }
    }

    $scope.monthlyIncome = function(income) {
        return income / 12;
    }

    $scope.biweeklyIncome = function(income) {
        return income / 26;
    }

    $scope.weeklyIncome = function(income){
    	return $scope.biweeklyIncome(income) / 2;
    }

    $scope.yearly = function(income, percentage) {
        return income * (percentage / 100);
    }

    $scope.monthly = function(income, percentage) {
        return $scope.yearly(income, percentage) / 12;
    };

    $scope.weekly = function(income, percentage) {
        return $scope.yearly(income, percentage) / 52;
    };

    $scope.biweekly = function(income, percentage) {
        return $scope.weekly(income, percentage) * 2;
    };

    $scope.increase = function(expense) {
        expense.setPercentage(expense.getPercentage() + 1);
        updateListOfPercentages();
    }

    $scope.decrease = function(expense) {
        if (expense.getPercentage() == 0) {
            return;
        }
        expense.setPercentage(expense.getPercentage() - 1);
        updateListOfPercentages();
    }

    var updateListOfPercentages = function() {
        $scope.listOfPercentages = [];
        angular.forEach($scope.expenses, function(value, key) {
            $scope.listOfPercentages.push(value.getPercentage());
        });
    }


    $scope.totalPercentage = function() {
        totalExpenses = 0;
        angular.forEach($scope.expenses, function(value, key) {
            totalExpenses += value.getPercentage();
        });
        return totalExpenses;
    }

    $scope.labels = [
        housing.getCategory(), utilities.getCategory(), transportation.getCategory(), food.getCategory(), personal.getCategory(), health.getCategory(), savings.getCategory(), debts.getCategory()
    ]

    $scope.data = $scope.listOfPercentages;

}]);
