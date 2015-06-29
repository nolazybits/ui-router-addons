// Sub-application/main Level State
app.config(['$stateProvider', '$modalStateProvider', function ($stateProvider, $modalStateProvider) {

    $stateProvider
        .state('app.home', {
            url: '^/home',
            templateUrl: 'js/main/templates/home.tpl.html',
            controller: 'HomeCtrl',
            controllerAs: 'ctrl'
        })
        .state('app.about', {
            url: '^/about',
            templateUrl: 'js/main/templates/about.tpl.html',
            controller: 'AboutCtrl',
            controllerAs: 'ctrl'
        })
        .state('app.contact', {
            url: '^/contact',
            templateUrl: 'js/main/templates/contact.tpl.html',
            controller: 'ContactCtrl',
            controllerAs: 'ctrl'
        })
        .state('app.nohistory', {
            url: '^/nohistory',
            history: false,
            templateUrl: 'js/main/templates/no_history.tpl.html'
        });

    $modalStateProvider
        .state('app.home.login', // this states needs to exists as
        {
            url: '/login',  //  this will get appended to the current url, if you want a modal not changing the url do not provide this property
            history: false,
            controller: 'LoginCtrl',
            controllerAs: 'ctrl',
            templateUrl: 'js/main/templates/login.tpl.html'
        });

}]);