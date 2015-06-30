/**
 * Created by nolazybits on 22/06/15.
 */
(function() {
    'use strict';

    var RedirectProvider = (function() {

        function $RedirectProvider() {}

        //  factory creation, returns the provider instance
        $RedirectProvider.prototype.$get = function ($state) {
            var _this = this;
            return {}
        };

        $RedirectProvider.prototype.$get.$inject = ['$state'];
        return $RedirectProvider;
    })();

    angular.module('ui.router.addons.redirect', [])
        .provider('$historyState', RedirectProvider)
        .config([
            '$provide', '$stateProvider', '$locationProvider',
            function($provide, $stateProvider) {
                var $state_transitionTo; // internal reference to the real $state.transitionTo function

                // Decorate the $state service, so we can decorate the $state.transitionTo() function with sticky state stuff.
                $provide.decorator('$state', ['$delegate', '$injector', function ($state, $injector) {
                    $state_transitionTo = $state.transitionTo;

                    $state.transitionTo = function (to, toParams, options) {
                        var rel = options && options.relative || $state.$current, // Not sure if/when $state.$current is appropriate here.
                            toStateSelf = $state.get(to, rel), // exposes findState relative path functionality, returns state.self
                            redirectTo;

                        //  check if we have the 'history' property on the config and if false call the replace on location
                        if( toStateSelf && toStateSelf.redirectTo )
                        {
                            redirectTo = toStateSelf.redirectTo;
                            if (angular.isString(redirectTo)) {
                                $state_transitionTo.call($state, redirectTo, toParams);
                            }
                            else if( Object.prototype.toString.call(redirectTo) == '[object Function]' ) {
                                var newState = $injector.invoke(redirectTo, null, { toState: toStateSelf, toParams: toParams });
                                if (newState) {
                                    if (angular.isString(newState)) {
                                        $state_transitionTo.call($state, newState);
                                    }
                                    else if (newState.state) {
                                        $state_transitionTo.call(newState.state, newState.params);
                                    }
                                }
                            }
                            else
                            {
                                throw new Error('Couldn\'t redirect');
                            }
                        }
                        else
                        {
                            $state_transitionTo.apply($state, arguments);
                        }
                        return $state;
                    };
                    return $state;
                }]);
            }
        ]);
})();