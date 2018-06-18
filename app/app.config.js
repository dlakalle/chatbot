(function(){
  angular.module('appModule').
    config(['$urlRouterProvider', '$locationProvider', '$stateProvider',
      function config($urlRouterProvider, $locationProvider, $stateProvider) {
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('login');

        $stateProvider.state('login', {
          url: '/login',
          template: '<login></login>'
        });

        $stateProvider.state('home', {
          url: '/home',
          template: '<layout></layout>'
        });

      }
    ])
    .config(['$httpProvider', 'jwtOptionsProvider',
      function ($httpProvider, jwtOptionsProvider) {
        jwtOptionsProvider.config({
          tokenGetter: ['loginService', function(loginService) {
            return loginService.getToken();
          }],
          unauthenticatedRedirectPath: '/login',
          whiteListedDomains: ['localhost'],
          authPrefix: 'JWT '
        });

        $httpProvider.interceptors.push('jwtInterceptor');
      }
    ])
    .run([
      'authManager',
      '$rootScope',
      '$state',
      function(authManager, $rootScope, $state) {
        authManager.checkAuthOnRefresh();
        authManager.redirectWhenUnauthenticated();
        $rootScope.$on( "$stateChangeStart", function(event, next, current) {
          if (!authManager.isAuthenticated() && next.name !== 'login') {
            event.preventDefault();
            $state.go('login');
          }
        });
      }
    ]);

})();
