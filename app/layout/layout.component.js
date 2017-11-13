(function(){
  angular.module('appModule').component('layout', {
    templateUrl: 'app/layout/layout.component.html',
    controller: function LayoutController($scope){

      var self = this;

      self.botName = 'Hal 9000';
      self.messages = [
        {content: 'Hola mundo', sentBy: 'bot'},
        {content: 'Hola mundo', sentBy: 'user'},
        {content: 'Hola mundo', sentBy: 'bot'},
        {content: 'Hola mundo', sentBy: 'user'},
        {content: 'Hola mundo', sentBy: 'bot'},
        {content: 'Hola mundo', sentBy: 'user'},
        {content: 'Hola mundo', sentBy: 'bot'},
      ];

      self.$onInit = function(){
        console.log('$onInit...');
      };

    }
  });
})();
