(function(){
  angular.module('appModule').component('layout', {
    templateUrl: 'app/layout/layout.component.html',
    controller: function LayoutController($scope, botService, $timeout, loginService){

      var self = this;
      self.cursos = [
        {
          "nombre": "Contabilidad para la gestión",
          "notificaciones": 3,
          "active": false
        },
        {
          "nombre": "Demo: Tutora virtual",
          "notificaciones": 0,
          "active": true
        },
        {
          "nombre": "Elementos de álgebra",
          "notificaciones": 14,
          "active": false
        },
        {
          "nombre": "Inglés 1",
          "notificaciones": 2,
          "active": false
        },
        {
          "nombre": "Economía",
          "notificaciones": 10,
          "active": false
        }
      ];

      self.secciones = [
        {
          "nombre": "Mi horario",
          "icono": "fa-calendar"
        },
        {
          "nombre": "Boletín de notas",
          "icono": "fa-calculator"
        },
        {
          "nombre": "Material docente",
          "icono": "fa-folder-open"
        },
        {
          "nombre": "Foro institucional",
          "icono": "fa-group"
        },
        {
          "nombre": "Noticias",
          "icono": "fa-bell"
        },
        {
          "nombre": "Institución",
          "icono": "fa-institution"
        }
      ];

      self.cursoActive = self.cursos[1];

      self.triggerBotSpeech = 0;

      self.$onInit = function(){
        self.username = loginService.getUser();
        $timeout(function () {
          self.veronicaHabla();
        }, 3500);
      };

      self.veronicaHabla = function(){
        self.triggerBotSpeech += 1;
      };

      self.hasUnread = false;

      self.notificar = function(hasUnread){
        self.hasUnread = hasUnread;
      };

      self.chatClosed = false;

      self.toggleCloseChat = function(isClosed){
        self.chatClosed = isClosed;
      };

      self.openChat = function(){
        self.chatClosed = false;
      };

      self.setCursoActive = function(curso){
        self.cursoActive.active = false;
        curso.active = true;
        self.cursoActive = curso;
      };
      self.logout = function(){
        loginService.logout();
      };
    }
  });
})();
