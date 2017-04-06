
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast) {
        console.log(JSON.parse(localStorage.getItem("produtos")));
        if (JSON.parse(localStorage.getItem("produtos"))) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
        } else {
            $scope.qtdProdutosCarrinho = 0;
        }

        $scope.carrinho = JSON.parse(localStorage.getItem("produtos"));
        
        for (var i = 0; i < $scope.carrinho.length; i++) {
            //ainda a ser implementado
        }
        
        $('#carrinho').append(
                '<tr><td><strong>Total</strong></td><td></td><td>R$10,00</td><td>10</td><td></td></tr>'
        );
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
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
