(function(){
  angular.module('appModule').component('chatbox', {
    templateUrl: 'app/chatbox/chatbox.component.html',
    bindings: {
      username: '<',
      triggerEvent: '<',
      notificationCallback: '<',
      isClosed: '<',
      toggleCloseChatCallback: '<'
    },
    controller: function ChatboxController($scope, botService, $timeout, loginService){

      var self = this;
      self.isHidden = true;
      self.hasUnread = false;
      self.isClosed = false;

      self.audio = new Audio('app/static/sfx.mp3');

      self.botName = 'Verónica';
      self.messages = [];

      self.toggle = function(){
        if(self.isHidden){
          self.hasUnread = false;
          self.notificationCallback(self.hasUnread);
        }
        self.isHidden = !self.isHidden;
      };

      self.$onInit = function(){
        console.log('$onInit...');
      };

      self.$onChanges = function(changes){
        if(changes.triggerEvent){
          if(self.triggerEvent !== 0 & self.triggerEvent !== undefined ){
            self.triggerClick();
          }
        }
      };

      self.pressEnter = function($event){
        if ($event.which === 13){
          self.sendMessage();
        }
      };

      self.playAudio = function() {
        self.audio.play();
      }

      self.closeChat = function(){
        self.toggleCloseChatCallback(true);
      };

      self.addBotMessage = function(data){
        if(self.isHidden){
          self.hasUnread = true;
          self.playAudio();
        }
        else {
          self.hasUnread = false;
        }

        self.notificationCallback(self.hasUnread);

        self.messages.push({
          content: data,
          sentBy: 'bot'
        });
      };

      self.triggerClick = function(){
        botService.triggerEvent('WELCOME').then(function(data){
          $timeout(function () {
            self.addBotMessage(data);
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
            self.addBotMessage(data);
          });
        });

        self.formMessage = '';
      };
    }
  });
})();
