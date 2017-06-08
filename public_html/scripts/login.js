
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', '$http', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $http) {

        $scope.fazerLogin = function (formulario, dados) {
            if (formulario.$valid) {
                var addressPostRequest = $http({
                    method: "POST",
                    url: "http://67.205.164.145/api/login",
                    data: {
                        email: dados.userName,
                        password: dados.senha
                    }
                }).then(function sucesso(response) {
                    console.log(response);
                    if (response.data.is_employee === 0) {
                        localStorage.setItem("funcionarioLogado", false);
                        localStorage.setItem("clienteLogado", true);
                        $scope.erroLogin = false;
                        window.location.href = 'index.html';
                    } else if (response.data.is_employee === 1) {
                        localStorage.setItem("funcionarioLogado", true);
                        localStorage.setItem("clienteLogado", false);
                        $scope.erroLogin = false;
                        window.location.href = 'index.html';

                    } else {
                        $scope.erroLogin = true;
                    }
                }, function erro(response) {
                    $scope.erroLogin = true;
                });
            }
        };
    }]);


function mostrarItensLocalStorage() {
    console.dir(JSON.parse(localStorage.getItem("produtos")));
}
;

app.config(function ($mdThemingProvider) {
    var customBlueMap = $mdThemingProvider.extendPalette('blue-grey', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('light-blue', {
                'default': '500',
                'hue-1': '50'
            })
    $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')
});

