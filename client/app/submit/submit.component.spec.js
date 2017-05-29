'use strict';

describe('Component: SubmitComponent', function() {
  // load the controller's module
  beforeEach(module('caportalApp.submit'));

  var SubmitComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SubmitComponent = $componentController('submit', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
