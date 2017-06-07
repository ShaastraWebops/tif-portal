'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var taskCtrlStub = {
  create: 'taskCtrl.create',
  gettasks: 'taskCtrl.gettasks',
  apply: 'taskCtrl.apply'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var taskIndex = proxyquire('./index', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './task.controller': userCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('User API Router:', function() {
  it('should return an express router instance', function() {
    expect(taskIndex).to.equal(routerStub);
  });

  describe('POST /api/tasks/create', function() {
    it('should verify admin role and route to task.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'taskCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/tasks/gettasks', function() {
    it('should be authenticated and route to task.controller.gettasks', function() {
      expect(routerStub.get
        .withArgs('/', 'taskCtrl.gettasks')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/tasks/apply/:id', function() {
    it('should be authenticated and route to task.controller.apply', function() {
      expect(routerStub.put
        .withArgs('/', 'taskCtrl.apply')
        ).to.have.been.calledOnce;
    });
  });
});
