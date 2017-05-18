
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', '$http', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $http) {
        if (localStorage.getItem("produtos") && localStorage.getItem("produtos").length > 0) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
            $scope.carrinho = JSON.parse(localStorage.getItem("produtos"));
        }


        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.rastrearPedido = function (codigoRastreamento, formularioDados) {
            formularioDados.$submitted;
            if (formularioDados.$valid || formularioDados == 'Não precisa') {
                $http({
                    method: "GET",
                    url: "http://67.205.164.145/api/client/1/order/" + codigoRastreamento,
                }).
                        then(function (data) {
                            $scope.id = data.data[0].id;
                            $scope.created_at = new Date(data.data[0].created_at);
                        }, function (data) {
                            console.error('Houve um erro ao fazer a busca do pedido.', data);
                        });
            }};

        $.urlParam = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            }
            else {
                return results[1] || 0;
            }
        };

        if ($.urlParam('orderId')) {
            $scope.codigoRastreamento = $.urlParam('orderId');
        }
        if ($.urlParam('orderFinished') != null) {
            $scope.vendaRealizada = $.urlParam('orderFinished');
            $scope.rastrearPedido($scope.codigoRastreamento, 'Não precisa');
        }

        $scope.close = function () {
            $('.alert').parent().fadeOut();
        }
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

