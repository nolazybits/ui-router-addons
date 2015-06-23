'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('app'));


  it('should ....', inject(function($controller) {
    //spec body
    var AppCtrl = $controller('AppCtrl', { $scope: {} });
    expect(AppCtrl).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var HomeCtrl = $controller('HomeCtrl', { $scope: {} });
    expect(HomeCtrl).toBeDefined();
  }));
});
