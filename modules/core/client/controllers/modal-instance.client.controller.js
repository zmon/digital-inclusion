angular.module('digitalInclusion.core').controller('ModalInstanceController', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
  if ($scope.selected.item.name == 'Public') {
  	// console.log("tuire")
  	$scope.formA = true;
  } else {
  	console.log($scope.selected.item);
  }

  $scope.dry = function () {
  	console.log("eu call");
  	$scope.wait = "Created";
  };

  $scope.ok = function () {
  	console.log("log");
  	$scope.dry();
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.encode = function() {

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});