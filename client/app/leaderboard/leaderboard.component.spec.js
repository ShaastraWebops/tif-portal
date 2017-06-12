'use strict';

describe('Component: LeaderboardComponent', function() {
  // load the controller's module
  beforeEach(module('caSite2018App.leaderboard'));

  var LeaderboardComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LeaderboardComponent = $componentController('leaderboard', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
