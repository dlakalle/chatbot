(function(){
  angular.module('appModule').component('login', {
    templateUrl: 'app/login/login.component.html',
    controller: function LoginController($scope, loginService){

      var self = this;

      self.username = '';
      self.password = '';

      self.login = function(){
        loginService.login(self.username, self.password, function(){
          console.log('ingresando con:', self.username, self.password);
        });
      }
    }
  });
})();
