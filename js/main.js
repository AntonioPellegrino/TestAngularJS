
var app = angular.module("test", ['ngRoute']);


app.config(function($routeProvider) {
         $routeProvider.when('/read/:params1/:params2/:params3/:params4', {
                templateUrl : 'read.html',
                controller  : 'readController'
            })
	.when('/', {
                templateUrl : 'main.html',
                controller  : 'provaHttp'
            });
    });



app.service('jsonService', function($http) {
   return {
     loginInfo: function(callback) {
       $http.get('json/who-am-i.json').success(callback);
     }
   }
});

app.controller("loginController", function($rootScope, jsonService){	
  jsonService.loginInfo(function(data) {
     $rootScope.login = data;
  });
});
				

app.service('httpService', function($http) {
   return {
     contentInfo: function(callback) {
       $http.get('json/stream-data.json').success(callback);
     },
	
   }
});

app.controller("provaHttp", function($rootScope, httpService){
  httpService.contentInfo(function(data) {
     $rootScope.datiGlobali = data.data;
  });
});

app.controller('readController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    	$scope.user = $routeParams.params1;
    	$scope.mess = $routeParams.params2;
    	$scope.date = $routeParams.params4;
    	$scope.rating = $routeParams.params3;
  }]);



app.controller('updateRootScope', function($scope, $rootScope) {
  $rootScope.changeStatus = function (entry) {
      $scope = $rootScope.datiGlobali;
      var mess = {
			"created_at": new Date(),
			"author": {
				"id": $rootScope.login.data.id,
				"username": $rootScope.login.data.username,
			},
			"message": entry,
			"rating": 0
		};	
      document.getElementById("txtarea").value="";
      $rootScope.datiGlobali.push(mess);
   }
});

