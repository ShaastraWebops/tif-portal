'use strict';

describe('Component: ListComponent', function() {
  // load the controller's module
  beforeEach(module('caportalApp.list'));

  var ListComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ListComponent = $componentController('list', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
