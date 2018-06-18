(function(){

  angular.module('appModule').service('apiService', function (){
    const baseUrl = 'http://localhost:3000';
    const api_auth_url = '/api-token-auth/';

    return {
      baseUrl: baseUrl,
      api_auth_url: api_auth_url
    };

  });

})();
