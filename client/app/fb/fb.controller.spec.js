'use strict';

describe('Controller: FbCtrl', function () {

  // load the controller's module
  beforeEach(module('caSite2018App'));

  var FbCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FbCtrl = $controller('FbCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
