angular.module('papaya')
.factory('login', ['$http', function($http){
	return {
		googleLogin: function(code){
			return $http({
				method: 'POST',
		        url: '/login',
				headers: {
					'Content-Type': 'application/octet-stream; charset=utf-8',
					'Access-Control-Allow-Origin': '*'
				},
		        data: code
		    });
		}
	}
}]);