
angular.module('ems')
.controller("loginController",['$scope','$http','$location',function($scope,$http,$location){
	$scope.doLogin=function(register){
		var details = JSON.stringify(register);
		
		console.log(details+"kkkkkkkkkkkkkk")
		$http.post('http://localhost:9000/users/login',details)
		.then(function(res){
			
			if(res){
				console.log(res.data)
				if(res.data.response=="adminsuccess"){
					
					$location.path('/managePublisherNew');
				}
				else if(res.data.response=="success"){
					
					$location.path('/managePublisherNew');
				}
			}
			else{
				console.log("registration failed");
				alert('registration failed');
			}
		})
		}
		
		
	
	
}])



 
angular.module('ems')
.controller("RegController",['$scope','$http','$location',function($scope,$http,$location){
	$scope.doRegister=function(registerdata){
		
		var details = JSON.stringify(registerdata);
		
	console.log(details+"kkkkkkkkkkkkkkkkkkkkkkk")
		$http.post('http://localhost:9000/users/register',details)
		.then(function(res){
			
			if(res){
				
				console.log(res.data)
				if(res.data=="success"){
					
					$location.path('/managePublisherNew');
				}
			}
			else{
				console.log("regis failed");
				
			}
		})
		}
		
		
	
	
}])


 
angular.module('ems')
.controller("getUserDetails",['$scope','$http','$location',function($scope,$http,$location){
	$scope.getAllUsers=function(){
		
		$http.post('http://localhost:9000/users/getAllUsers')
		.then(function(res){
			
			if(res){
				console.log(res.data.allusers);
				var details = JSON.stringify(res.data.allusers)
				 var usersLength=res.data.allusers.length;
				console.log(res.data.allusers.length)
				//$scope.test=res.data.allusers;
					$scope.usersValues=res.data.allusers;
					
				
				
			}
			else{
				console.log("regis failed");
				
			}
		})
		}
		
		
	
	
}]) 

angular.module('ems')
.controller("editUserDetails",['$scope','$http','$location',function($scope,$http,$location){
	$scope.editUser=function(userID){
		alert(userID)
		var userId={userId:userID}
		
		console.log(userId)
		$http.get('http://localhost:9000/users/editUsers/?data='+userId.userId)
		.then(function(res){
			if(res)
			{
				console.log(res)
			}
			
		})
		
	}
		
}])