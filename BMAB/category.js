angular.module('BuildMeABudget').service('Category', function(){
	var category;
	var description;
	var percentage;
	var yearly;
	var monthly;
	var biweekly;
	var weekly;

	var Category = function(category, description, percentage, yearly, monthly, biweekly, weekly){
		this.category = category;
		this.description = description;
		this.percentage = percentage;
		this.yearly = yearly;
		this.monthly = monthly;
		this.biweekly = biweekly;
		this.weekly = weekly;
	}

	Category.prototype.getCategory = function (){
		return this.category;
	}

	Category.prototype.getDescription = function(){
		return this.description;
	}

	Category.prototype.getPercentage = function(){
		return this.percentage; 
	}

	Category.prototype.getYearly = function(){
		return this.yearly;
	}

	Category.prototype.getMonthly = function(){
		return this.monthly;
	}

	Category.prototype.biweekly = function(){
		return this.biweekly;
	}

	Category.prototype.weekly = function(){
		return this.weekly;
	}

	Category.prototype.setYearly = function(value){
		this.Yearly = value;
	}

	Category.prototype.setMonthly = function(value){
		this.monthly = value;
	}

	Category.prototype.setBiweekly = function(value){
		this.biweekly = value;
	}

	Category.prototype.setWeekly = function(value){
		this.weekly = value;
	}

	Category.prototype.setPercentage = function(percentage){
		this.percentage = percentage;
	}

	return Category;

});