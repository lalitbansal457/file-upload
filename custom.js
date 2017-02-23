var myApp = angular.module('myApp', []);


myApp.service('fileUpload', ['$https', function ($https) {
    this.uploadFileToUrl = function(file, uploadUrl){
       var fd = new FormData();
       fd.append('file', file);
    
       $https.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
    
       .success(function(){
       })
    
       .error(function(){
       });
    }
 }]);

myApp.directive('fileModel', ['$parse', function ($parse) {
	return {
	   restrict: 'A',
	   link: function(scope, element, attrs) {
	      var model = $parse(attrs.fileModel);
	      var modelSetter = model.assign;
	      
	      element.bind('change', function(){
	         scope.$apply(function(){
	            modelSetter(scope, element[0].files[0]);
	         });
	      });
	   }
	};
}]);


myApp.controller('sampleAppCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.uploadFile = function(){
	   var file = $scope.myFile;
	   
	   console.log('file is ' );
	   console.dir(file);
	   
	   var uploadUrl = "http://localhost:8000/uploads";
	   //fileUpload.uploadFileToUrl(file, uploadUrl);
	   $scope.uploadFileToUrl = function(file, uploadUrl){
	      var fd = new FormData();
	      fd.append('file', file);
	   
	      $http.post(uploadUrl, fd, {
	         transformRequest: angular.identity,
	         headers: {'Content-Type': undefined}
	      })
	   
	      .success(function(res){
	      	console.log(res)
	      })
	   
	      .error(function(){
	      	console.log("eror")
	      });
	   }
	   $scope.uploadFileToUrl(file, uploadUrl)
	};
}]);