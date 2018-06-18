(function () {
  angular.module('appModule').service('loginService', function(
      $rootScope,
      store,
      $state,
      $http,
      apiService,
      jwtHelper
    ) {
      var api_auth_url = apiService.api_auth_url;

      $rootScope.$on('unauthenticated', function () {
        logout();
      });

      function login(username, password, callback) {
        $http({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          url: apiService.baseUrl + api_auth_url,
          data: JSON.stringify({ username: username, password: password })
        }).then(function(response){
          var token = response.data.token;
          console.log(jwtHelper.getTokenExpirationDate(token));
          console.log(jwtHelper.decodeToken(token));
          store.set('user', response.data.user);
          store.set('token', token);
          $http.defaults.headers.common.Authorization = 'JWT ' + token;
          $state.go('home');
        }).catch(function(response){
          callback();
        });
      }

      function logout() {
        store.remove('user');
        store.remove('token');
        $http.defaults.headers.common.Authorization = '';
        $state.go('login');
      }

      function getToken() {
        console.log('---------------> getting token');
        return store.get('token');
      }

      function getUser() {
        var user = store.get('user');
        var temp = user.username;
        return temp;
      }

      return {
        login: login,
        logout: logout,
        getToken: getToken,
        getUser: getUser
      };
  });

})();
