var app = angular.module('StarterApp', ['jkAngularCarousel','ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);
app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', '$http', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $http) {
        if (localStorage.getItem("produtos") && localStorage.getItem("produtos").length > 0) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
        } else {
            $scope.qtdProdutosCarrinho = 0;
        }

        $(".principal").LoadingOverlay("show");
        $http.get("http://67.205.164.145/api/book").then(function (response) {
            $scope.produtos = response.data;
            for (var i = 0; i < $scope.produtos.length; i++) {               
                $scope.produtos[i].book_id = response.data[i].id;
                $scope.produtos[i].desiredQuantity = 0;
                $scope.produtos[i].showQuantity = false;
                $scope.produtos[i].quantity = 0;
            }
            
            $(".principal").LoadingOverlay("hide", true);
        });

        $scope.showCustom = function (event, dadosProduto) {
            console.log('dadosProduto = ', dadosProduto);
            var preco = 'R$'+Number(dadosProduto.price).toFixed(2).replace(".", ",");;
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog class="dialog-detalhes-livro">' +
                        '<md-dialog-content>' +
                        '<h1>' + dadosProduto.title + '</h1>' +
                        '<img class="dialog-img-livro" src="http://67.205.164.145/' + dadosProduto.image + '" title="Livro ' + dadosProduto.title + '. " alt="Livro ' + dadosProduto.author + '. "/>' +
                        '<div class="dialog-descricao-livro"><p>Todo o reino de Westeros ao alcance das mãos</p>'+

'<p>A série Crônicas de Gelo e Fogo dispensa apresentações. São mais de 30 milhões de livros vendidos ao redor do mundo – e cerca de 2 milhões do Brasil. Os números, assim como a profusão de tramas e personagens impressiona e atrai mais fãs a cada dia.</p>'+
'<p>Para satisfazer a ânsia dos aficionados e dos novos leitores, a Leya publica uma nova edição limitada do Box Crônicas de Gelo e Fogo com os cinco livros já escritos - A Fúria dos Reis, A Tormenta de Espadas, O Festim dos Corvos e A Dança dos Dragões – em versão pocket.</p>' +
'<p>Em uma terra onde o verão pode durar décadas e o inverno toda uma vida, os problemas estão apenas começando. O frio está de volta e, nas florestas ao norte de Winterfell, forças sobrenaturais se espalham por trás da Muralha que protege a região. No centro do conflito estão os Stark do reino de Winterfell, uma família tão áspera quanto as terras que lhe pertencem.</p>' +
'<pDos lugares onde o frio é brutal até os distantes reinos de plenitude e sol, George R. R. Martin narra uma história de lordes e damas, cavaleiros e mercenários, assassinos e bastardos, que se juntam em um tempo de presságios malignos. Entre disputas por reinos, tragédias e traições, vitória e terror, o destino dos Stark, seus aliados e seus inimigos é incerto.</p></div>'+
                        '</md-dialog-content>' +
                        '<md-dialog-actions layout="row">' +
                        '<div class="dialog-preco-livro">Preço:<span>' + preco + '</span></div>' +
                        '<span flex></span>' +
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

            if (operacao === 'adicionar') {
                $http.get("http://67.205.164.145/api/item/" + $scope.produtos[index].id)
                .then(function (response) {
                    $scope.produtos[index].quantity = response.data.quantity
                    if (!(produto.desiredQuantity === $scope.produtos[index].quantity)) {
                        $scope.produtos[index].desiredQuantity++;
                    } else {
                        $scope.showCustomToast('Não há em estoque essa quantidade! ');
                    }
                    $scope.atualizar();
                });
            } else if (operacao === 'remover') {
                if ($scope.produtos[index].desiredQuantity !== 1) {
                    $scope.produtos[index].desiredQuantity--;
                    $scope.atualizar();
                }
            }

            $scope.atualizar = function(){
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
            console.log(produtos);
            console.log('localStorage atualizado: ');
            }

        };

        $scope.adicionarAoCarrinho = function (produto) {
            if (localStorage.getItem("produtos") && localStorage.getItem("produtos").length > 0) {
                var itensAdicionados = JSON.parse(localStorage.getItem("produtos"));
            } else {
                var itensAdicionados = [];
            }

            itensAdicionados.push({
                id: itensAdicionados.length,
                book_id: produto.book_id,
                name: produto.title,
                price: produto.price,
                image: produto.image,
                description: produto.description,
                desiredQuantity: 1,
                quantity: 2
            });

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
                    var produtos = JSON.parse(localStorage.getItem("produtos"));
                    for (var i = produtos.length - 1; i >= 0; i--) {
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

$scope.dataArray = [
      {
        src: 'images/slide2.jpg'
      },
      {
        src: 'images/slide4.jpg'
      }
    ];

        $scope.produtosSlider = [
            {
                "id": 6,
                "title": "Guerra Civil",
                "author": "Stuart Moore",
                "editor": "Novo Século - SP",
                "year_published": "2014",
                "price": "0.0000",
                "image": "/storage/books/6.jpg",
                "created_at": "2017-05-05 22:55:16",
                "updated_at": "2017-05-05 22:55:16",
                "deleted_at": null,
                "description": null,
                "isbn": "9788542804126",
                "slideImg": "images/slide1.png",
                "active": false

            },
            {
                "id": 6,
                "title": "Guerra Civil",
                "author": "Stuart Moore",
                "editor": "Novo Século - SP",
                "year_published": "2014",
                "price": "0.0000",
                "image": "/storage/books/6.jpg",
                "created_at": "2017-05-05 22:55:16",
                "updated_at": "2017-05-05 22:55:16",
                "deleted_at": null,
                "description": null,
                "isbn": "9788542804126",
                "slideImg": "images/slide1.png",
                "active": true
            }
        ]

        $scope.checkStock = function (book_id) {
            $http.get("http://pi4.app/api/item/" + book_id).then(function (response) {
                if (response.data.quantity !== undefined) {
                    return response.data.quantity;
                }
            });
        };
        if(localStorage.getItem('clienteLogado') === 'true'){
            $scope.clienteLogado = true;
        }else if(localStorage.getItem('funcionarioLogado')  === 'true'){
            $scope.funcionarioLogado = true;
        }
    }]);

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

    function logout() {
        localStorage.setItem("funcionarioLogado", false);
        localStorage.setItem("clienteLogado", false);
        window.location.href = 'login.html';
    }
 