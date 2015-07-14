/**
 * Created by nolazybits on 22/06/15.
 */
(function() {
    'use strict';

    var ModalStateProvider = (function() {

        function $ModalStateProvider($stateProvider) {
            this.modals = {};
            this.$stateProvider = $stateProvider;
            this.defaultOptions = {};
        }

        $ModalStateProvider.prototype.showModal = function (id, options) {
            throw new Error('You need to define a showModal function on the modalStateProvider or modalState service');
        };

        $ModalStateProvider.prototype.hideModal = function (id, object) {
            throw new Error('You need to define a hideModal function on the modalStateProvider or modalState service');
        };

        //  register a state against the modal state provider
        $ModalStateProvider.prototype.state = function (name, config) {
            var _this = this;
            var modalOptions = this.defaultOptions;
            modalOptions = angular.extend({}, modalOptions, config);

            //  flag it as a modal
            config.modal = true;

            config.onEnter = function ($state, $modalState) {
                _this.modals[this.name] = $modalState.showModal(this.name, modalOptions);
            };
            config.onEnter.$inject = ['$state', '$modalState'];

            delete config.template;
            delete config.templateUrl;
            this.$stateProvider.state(name, config);
            return this;
        };

        //  factory creation, returns the provider instance
        $ModalStateProvider.prototype.$get = function ($state) {
            var _this = this;
            return {
                showModal: _this.showModal,
                hideModal: _this.showModal,
                exit: function() {
                    //  get current state
                    var currentState = $state.current,
                        stateToName, index, instance;

                    if(currentState.modal === true)
                    {
                        //  get whatever the developer stored in the dictionary
                        instance = _this.modals[currentState.name];
                        //  and call the hideModal passing this
                        this.hideModal(currentState.name, instance);
                        //  and remove the key/value from the dictionary
                        delete _this.modals[name];
                        //  and finally transition back to the parent state
                        var index = currentState.name.indexOf('.modal.');
                        if( index !== -1)
                        {
                            stateToName = currentState.name.substring(0, index);
                        }
                        else
                        {
                            stateToName = currentState.name.substring(0, currentState.name.lastIndexOf('.'));
                        }
                        $state.go(stateToName);
                    }

                }
            };
        };

        $ModalStateProvider.$inject = ['$stateProvider'];
        $ModalStateProvider.prototype.$get.$inject = ['$state'];
        return $ModalStateProvider;
    })();

    angular.module('ui.router.addons.modal', [])
        .provider('$modalState', ModalStateProvider)
        .config([
            '$provide', '$stateProvider',
            function($provide, $stateProvider) {
                var $state_transitionTo; // internal reference to the real $state.transitionTo function

                // Decorate the $state service, so we can decorate the $state.transitionTo() function with sticky state stuff.
                $provide.decorator("$state", ['$delegate', function ($state) {
                    $state_transitionTo = $state.transitionTo;

                    $state.transitionTo = function (to, toParams, options) {
                        var fromState, fromParams, statePath, newtoState, transitionPromise, path,
                            rel = options && options.relative || $state.$current, // Not sure if/when $state.$current is appropriate here.
                            toStateSelf = $state.get(to, rel); // exposes findState relative path functionality, returns state.self

                        //  copy the state if not already child of the current state.
                        if (toStateSelf && toStateSelf.modal)
                        {
                            if(to.indexOf($state.current.name) === -1) {
                                fromState = $state.$current;
                                newtoState = angular.copy(toStateSelf);
                                //  append the name to the current state name.
                                newtoState.name = fromState.name + '.modal.' + toStateSelf.name;
                                //  does the state exist?
                                if (!$state.get(newtoState.name)) {
                                    statePath = fromState.name;
                                    //  if not create the hierarchy to go to this state. the parent will be abstract
                                    path = ('modal.' + toStateSelf.name).split('.');
                                    for (var i = 0, len = path.length; i < len - 1; i++) {
                                        statePath += '.' + path[i];
                                        if (!$state.get(statePath)) {
                                            //  add parent to stateProvider (otherwise our final state won't be registered)
                                            $stateProvider.state(statePath, {abstract: true});
                                        }
                                    }
                                    //  finally add our modal state
                                    $stateProvider.state(newtoState.name, newtoState);
                                }
                                to = newtoState.name;
                            }
                            $state_transitionTo.call($state, to, toParams);
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