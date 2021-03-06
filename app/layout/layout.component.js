(function(){
  angular.module('appModule').component('layout', {
    templateUrl: 'app/layout/layout.component.html',
    controller: function LayoutController($scope, botService, $timeout){

      var self = this;

      self.botName = 'Verónica';
      self.messages = [];

      self.$onInit = function(){
        console.log('$onInit...');
      };

      self.pressEnter = function($event){
        if ($event.which === 13){
          self.sendMessage();
        }
      };

      self.triggerClick = function(){
        botService.triggerEvent('INIT').then(function(data){
          $timeout(function () {
            self.messages.push({
              content: data,
              sentBy: 'bot'
            });
          });      
        });
      };

      self.sendMessage = function(){
        self.messages.push({
          content: self.formMessage,
          sentBy: 'user'
        });
        
        botService.sendMessage(self.formMessage).then(function(data){
          console.log(data);
          $timeout(function () {
            self.messages.push({
              content: data,
              sentBy: 'bot'
            });
          });
        });

        self.formMessage = '';
      };
    }
  });
})();
