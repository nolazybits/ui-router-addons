/**
 * Created by nolazybits on 22/06/15.
 */
(function() {
    'use strict';

    var HistoryProvider = (function() {

        function $HistoryProvider() {}

        //  factory creation, returns the provider instance
        $HistoryProvider.prototype.$get = function ($state) {
            var _this = this;
            return {}
        };

        $HistoryProvider.prototype.$get.$inject = ['$state'];
        return $HistoryProvider;
    })();

    angular.module('ui.router.addons.history', [])
        .provider('$historyState', HistoryProvider)
        .config([
            '$provide', '$stateProvider', '$locationProvider',
            function($provide, $stateProvider, $locationProvider) {
                var $state_transitionTo; // internal reference to the real $state.transitionTo function

                //  use the html5 mode for location (no hash in the url)
                $locationProvider.html5Mode(true);

                // Decorate the $state service, so we can decorate the $state.transitionTo() function with sticky state stuff.
                $provide.decorator('$state', ['$delegate', '$location', function ($state, $location) {
                    $state_transitionTo = $state.transitionTo;

                    $state.transitionTo = function (to, toParams, options) {
                        var fromState = $state.$current,
                            fromStateSelf = fromState.self;

                        //  check if we have the 'history' property on the config and if false call the replace on location
                        console.log(fromState);
                        if( fromStateSelf.history !== null && fromStateSelf.history === false )
                        {
                            $location.replace();
                            //  TODO check for same url twice in the history
                        }

                        $state_transitionTo.apply($state, arguments);
                        return $state;
                    };
                    return $state;
                }]);
            }
        ]);
})();