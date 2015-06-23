var app = angular.module('app', ['ui.router', 'ngMaterial', 'nolazybits.ui.router.addons.modal'])
    .config(['$modalStateProvider', function($modalStateProvider) {
        $modalStateProvider.defaultOptions = {
            hasBackdrop: true,
            clickOutsideToClose: true,
            escapeToClose: true
        }
    }])
    .run(['$modalState', '$mdDialog', '$state', function($modalState, $mdDialog) {
        $modalState.showModal = function(id, options) {
            var promise = $mdDialog.show(options);
            promise.finally(function(){
                $modalState.exit();
            });
            return promise;
        };
        $modalState.hideModal = function(id, promise) {
            $mdDialog.hide(promise);
        };
    }]);
