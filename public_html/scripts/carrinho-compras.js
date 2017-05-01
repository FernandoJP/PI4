
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', '$http', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $http) {
        if (localStorage.getItem("produtos") && localStorage.getItem("produtos").length > 0) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
            $scope.carrinho = JSON.parse(localStorage.getItem("produtos"));

            //$scope.carrinho.push({id:Number.MAX_SAFE_INTEGER, price:valorTotal, desiredQuantity:qtdTotal});

            $('#carrinho').append(
                    '<tr><td><strong>Total</strong></td><td></td><td>R$10,00</td><td>10</td><td></td></tr>'
                    );

            $scope.realizarVenda = function () {
                $http({
                    method: "POST",
                    url: "http://pi4.app/api/client/1/order/",
                    data: {
                        person_id: 1,
                        payment_type_id: 1,
                        books: JSON.parse(localStorage.getItem("produtos"))
                    }
                }).
                then(function(respItem){
                    $scope.showCustomToast('Venda realizada com sucesso, seu número de protocolo é ' + respItem[0].order_id);    
                    for (var i = $scope.carrinho.length - 1; i >= 0; i--) {
                        $scope.removerProduto($scope.carrinho[i].id);
                    }
                }, function(respItem){
                    $scope.showCustomToast('Não há itens em estoque para o produto solicitado');
                });
            };
            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();
            };

            $scope.alterarQtdProdutos = function (operacao, produto) {
                console.log('produto', produto);
                var index = $scope.carrinho.findIndex(x => x.id === produto.id);

                if (operacao === 'adicionar') {
                    if (!(produto.desiredQuantity === $scope.carrinho[index].quantity)) {
                        $scope.carrinho[index].desiredQuantity++;
                    } else {
                        $scope.showCustomToast('Não há em estoque essa quantidade! ');
                    }
                } else if (operacao === 'remover') {
                    if ($scope.carrinho[index].desiredQuantity !== 1) {
                        $scope.carrinho[index].desiredQuantity--;
                    }
                }

                //atualizar quantidade no local storage
                var produtos = JSON.parse(localStorage.getItem("produtos"));
                for (var i = produtos.length - 1; i >= 0; i--) {
                    console.log('if ' + produtos[i].id + ' == ' + produtos.length - 1);
                    if (produtos[i].id == produtos.length - 1) {
                        produtos[i].desiredQuantity = produto.desiredQuantity;
                        break;
                    }
                }
                localStorage.setItem("produtos", JSON.stringify(produtos));
                console.log('localStorage atualizado: ');
                console.dir(JSON.parse(localStorage.getItem("produtos")));
            };

            $scope.removerProduto = function (produto) {
                console.log('produto', produto);
                var index = $scope.carrinho.findIndex(x => x.id === produto.id);
                $scope.carrinho.splice(index, 1);
                localStorage.setItem("produtos", $scope.carrinho);
                console.log('produto removido', $scope.carrinho);
            };

            $scope.showCustomToast = function (msg) {
                var toast = $mdToast.simple()
                        .textContent(msg)
                        .highlightAction(false)
                        .hideDelay(4000)
                        .position('top right');
                $mdToast.show(toast).then(function (response) {

                });
            };
        } else {
            $scope.qtdProdutosCarrinho = 0;
        }

        $scope.atualizarTotal = function (oQue) {
            $scope.qtdTotal = 0, $scope.valorTotal = 0;
            for (var i = 0; i < $scope.carrinho.length; i++) {
                $scope.qtdTotal += +$scope.carrinho[i].desiredQuantity;
                $scope.valorTotal += +$scope.carrinho[i].price;
            }
            if(oQue === 'preco') return $scope.valorTotal;
            else if(oQue === 'quantidade') return $scope.qtdTotal;
            else console.error('Erro na função atualizarTotal()!! ');
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
