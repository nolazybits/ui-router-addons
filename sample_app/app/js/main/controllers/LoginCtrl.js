app.controller('LoginCtrl', ['$scope', '$modalState', '$mdDialog', function($scope, $modalState, $mdDialog) {
    this.hide = function() {
        $mdDialog.hide();
    };
    this.cancel = function() {
        $mdDialog.cancel();
    };
    this.answer = function(answer) {
        $mdDialog.hide(true);
    };
}]);