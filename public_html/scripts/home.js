
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);
app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', '$http', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $http) {
        if (JSON.parse(localStorage.getItem("produtos"))) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
        } else {
            $scope.qtdProdutosCarrinho = 0;
        }

        $http.get("http://67.205.164.145/api/book").then(function (response) {
            $scope.produtos = response.data;
            for (var i = 0; i < $scope.produtos.length; i++) {
                $scope.produtos[i].quantity = 10;
                $scope.produtos[i].desiredQuantity = 0;
                $scope.produtos[i].showQuantity = false;
                console.log($scope.produtos);
            }
        });

        $scope.showCustom = function (event, dadosProduto) {
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog class="dialog-detalhes-livro">' +
                        '<md-dialog-content>' +
                        '<h1>' + dadosProduto.title + '</h1>' +
                        '<img class="dialog-img-livro" src="data:image/png;base64,' + dadosProduto.image + '" title="Livro ' + dadosProduto.title + '. " alt="Livro ' + dadosProduto.author + '. "/>' +
                        '<div class="dialog-descricao-livro"><p>' + dadosProduto.ISBN + '</p></div>' +
                        '</md-dialog-content>' +
                        '<md-dialog-actions layout="row">' +
                        '<div class="dialog-preco-livro">Preço:<span>' + dadosProduto.price + '</span></div>' +
                        '<span flex></span>' +
                        '<md-button class="md-raised md-primary">Comprar</md-button>' +
                        '<md-dialog-actions>' +
                        '</md-dialog>',
                controller: function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                }
            });
        }

        ;
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
        $scope.alterarQtdProdutos = function (operacao, produto) {
            var index = $scope.produtos.findIndex(x => x.id === produto.id);
            console.log(index);

            if (operacao === 'adicionar') {
                console.log(!(produto.desiredQuantity + '===' + $scope.produtos[index].quantity));
                if (!(produto.desiredQuantity === $scope.produtos[index].quantity)) {
                    $scope.produtos[index].desiredQuantity++;
                } else {
                    $scope.showCustomToast('Não há em estoque essa quantidade! ');
                }
            } else if (operacao === 'remover') {
                if ($scope.produtos[index].desiredQuantity !== 1) {
                    $scope.produtos[index].desiredQuantity--;
                }
            }
        };

        $scope.adicionarAoCarrinho = function (produto) {
            if (JSON.parse(localStorage.getItem("produtos"))) {
                var itensAdicionados = JSON.parse(localStorage.getItem("produtos"));
            } else {
                var itensAdicionados = [];
            }
            itensAdicionados.push({name: produto.name, price: produto.price, image: produto.image});
            localStorage.setItem("produtos", JSON.stringify(itensAdicionados));
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //atualizando no badge de carrinhos
            $scope.showToast(produto.nome); //mostrando o toast com a ação de desfazer
        };
        $scope.showToast = function (nomeProduto) {
            var toast = $mdToast.simple()
                    .textContent('Livro adicionado com sucesso no carrinho. ')
                    .action('Desfazer')
                    .highlightAction(false)
                    .hideDelay(4000)
                    .position('top right');
            $mdToast.show(toast).then(function (response) {
                if (response == 'ok') { //se clicou em desfazer 
                    console.dir(JSON.parse(localStorage.getItem("produtos")));
                    var produtos = JSON.parse(localStorage.getItem("produtos"));
                    for (var i = produtos.length - 1; i >= 0; i--) {
                        console.log('if ' + produtos[i].nome + ' === ' + nomeProduto);
                        if (produtos[i].nome == nomeProduto) {
                            produtos.splice(i, 1);
                            break;
                        }
                    }
                    localStorage.setItem("produtos", JSON.stringify(produtos));
                    $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //atualizando no badge de carrinhos
                }

            });
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
 