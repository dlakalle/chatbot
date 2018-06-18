(function(){
  var app = angular.module('appModule', [
    'ui.router',
    'angular-storage',
    'ngSanitize',
    'luegg.directives',
    'angular-jwt'
  ]);

  app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
  })

})();
