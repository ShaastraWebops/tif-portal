'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('forumHome', {
    url: '/forumHome',
    template: require('./forumHome/forumHome.html'),
    controller: 'forumHomeController',
    controllerAs: 'vm',
    authenticate: false
  })
  .state('addQuestion', {
    url: '/addQuestion',
    template: require('./addQuestion/addQuestion.html'),
    controller: 'addQuestionController',
    controllerAs: 'vm',
    authenticate: false
  });
}
