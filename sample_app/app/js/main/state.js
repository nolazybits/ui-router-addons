// Sub-application/main Level State
app.config(['$stateProvider', '$modalStateProvider', function($stateProvider, $modalStateProvider) {

  $stateProvider
    .state('app.home', {
      url: '/home',
        onEnter: function() {console.log('entering home')},
        onExit: function() {console.log('exiting home')},
        templateUrl: 'js/main/templates/home.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'ctrl'
    })
    .state('app.about', {
      url: '/about',
      templateUrl: 'js/main/templates/about.tpl.html',
        controller: 'AboutCtrl',
        controllerAs: 'ctrl'
    })
    .state('app.contact', {
      url: '/contact',
      templateUrl: 'js/main/templates/contact.tpl.html',
        controller: 'ContactCtrl',
        controllerAs: 'ctrl'
    });

  $modalStateProvider
      .state('app.home.login', // this states needs to exists as
      {
        modal: true,
        url: '/login',  //  this will get appended to the current url, if you want a modal not changing the url do not provide this property
        controller: 'LoginCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'js/main/templates/login.tpl.html'
      });

}]);