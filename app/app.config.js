(function(){
  angular.module('appModule').
    config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
      function config($urlRouterProvider, $locationProvider, $stateProvider) {
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('/', {
          url: '/',
          template: '<layout></layout>'
        });

      }
    ]);

})();

