var myApp = angular.module('myApp', []);

/* Directive for updating the model value */
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


myApp.controller('sampleAppCtrl', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {
	var httpUrl = $location.protocol() + '://'+ $location.host() +':'+  $location.port();
	/* Check canvas list of images from localStorage */
	if(localStorage.canvasImgList) {
		$scope.canvasImgList = JSON.parse(localStorage.canvasImgList);
	} else {
		$scope.canvasImgList = [];
	}
	
	/* Function to upload File */
	$scope.uploadFile = function(){
	   	var file = $scope.myFile;
	   console.log($location.protocol() + '://'+ $location.host() +':'+  $location.port() )
	   	$scope.uploadFileToUrl = function(file, uploadUrl){
	      	var fd = new FormData();
	      	fd.append('upload', file);
	   		/* api hit for uploading the images */
	      	$http.post(httpUrl+ "/uploads", fd, {
	         	transformRequest: angular.identity,
	         	headers: {'Content-Type': undefined}
	      	})
	   
	      	.success(function(res){
	      		$scope.getImages();
	      	})
	   
	      	.error(function(){
	      		
	      	});
	   }
	   $scope.uploadFileToUrl(file, httpUrl)
	};

	/* api hit for getting the images */
	$scope.getImages = function() {
		$http.get(httpUrl+'/images').then(function(res) {
			$scope.imageList = res.data;
		});
	}
	$scope.getImages();

	/* function to Save image to canvas */
	$scope.saveToCanvas = function(url) {
		if($scope.canvasImgList.indexOf(url) == -1) {
			$scope.canvasImgList.push(url);
			localStorage.setItem('canvasImgList', JSON.stringify($scope.canvasImgList));
		} else {
			window.alert("Image already exist");
		}
		
	}

	/* function to remove image from canvas */
	$scope.removeFromCanvas = function(index) {
		$scope.canvasImgList.splice(index,1);
		localStorage.setItem('canvasImgList', JSON.stringify($scope.canvasImgList));
	}

	/* Function to move the canvas image block*/
	$timeout(function(){
		jQuery( ".dragdrop" ).draggable({
			containment: ".canvas"
		});
	}, 1500)
	
	
}]);