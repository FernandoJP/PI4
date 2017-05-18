
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', '$http', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $http) {
        if (localStorage.getItem("produtos") && localStorage.getItem("produtos").length > 0) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
            $scope.carrinho = JSON.parse(localStorage.getItem("produtos"));
            $scope.dadosFinalizacaoCompra = [];    
            //$scope.carrinho.push({id:Number.MAX_SAFE_INTEGER, price:valorTotal, desiredQuantity:qtdTotal});

            $('#carrinho').append(
                    '<tr><td><strong>Total</strong></td><td></td><td>R$10,00</td><td>10</td><td></td></tr>'
                    );

            $scope.realizarVenda = function (dadosFinalizacaoCompra, formulario, cb1) {
                $scope.submitted = true;
                console.log(cb1)
                if (formulario.$valid) {
                    if(cb1 == false || cb1 == undefined){
                        var addressPostRequest = $http({
                            method:"POST",
                            url: "http://67.205.164.145/api/client/1/address",
                            data: {
                                address: dadosFinalizacaoCompra.rua,
                                cep: dadosFinalizacaoCompra.cep,
                                city: dadosFinalizacaoCompra.cidade,
                                state: dadosFinalizacaoCompra.uf
                            }
                        }).then(function(response){
                            $scope.address = response.data[0];
                            console.log(response);
                        });

                        addressPostRequest.then(function(response){
                        $http({
                            method: "POST",
                            url: "http://67.205.164.145/api/client/1/order/",
                            data: {
                                person_id: 1,
                                payment_type_id: 1,
                                address_id: $scope.address.id,
                                books: JSON.parse(localStorage.getItem("produtos"))
                            }
                        }).
                        then(function (respItem) {
                            console.log(respItem);
                            //$scope.showCustomToast('Venda realizada com sucesso, seu número de protocolo é ' + respItem.data[0].order_id);
                            for (var i = $scope.carrinho.length - 1; i >= 0; i--) {
                                $scope.removerProduto($scope.carrinho[i].id);
                            }
                            window.location.href="rastrear-pedidos.html?orderId="+respItem.data[0].order_id+"&orderFinished=true";
                        }, function (respItem) {
                            $scope.showCustomToast('Não há itens em estoque para o produto solicitado');
                        });
                    });
                    } else {
                        $http({
                            method: "POST",
                            url: "http://67.205.164.145/api/client/1/order/",
                            data: {
                                person_id: 1,
                                payment_type_id: 1,
                                address_id: $scope.address.id,
                                books: JSON.parse(localStorage.getItem("produtos"))
                            }
                        }).
                        then(function (respItem) {
                            console.log(respItem);
                            //$scope.showCustomToast('Venda realizada com sucesso, seu número de protocolo é ' + respItem.data[0].order_id);
                            for (var i = $scope.carrinho.length - 1; i >= 0; i--) {
                                $scope.removerProduto($scope.carrinho[i].id);
                            }
                            window.location.href="rastrear-pedidos.html?orderId="+respItem.data[0].order_id+"&orderFinished=true";
                        }, function (respItem) {
                            $scope.showCustomToast('Não há itens em estoque para o produto solicitado');
                        });
                    }


                }

            };
            
                    /*$scope.init = function(){
            $('.principal').css('width',$('.tabela-produtos > tbody > tr').width());
        }*/

            $scope.preecherEndereco = function () {
                //Nova variável "cep" somente com dígitos.
                if($scope.cep){
                                    var cep = $scope.cep.replace(/\D/g, '');
                }


                //Verifica se campo cep possui valor informado.
                if (cep != "") {

                    //Expressão regular para validar o CEP.
                    var validacep = /^[0-9]{8}$/;

                    //Valida o formato do CEP.
                    if (validacep.test(cep)) {
                        //$("md-dialog").LoadingOverlay("show");

                        //Consulta o webservice viacep.com.br/
                        $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                            console.log('requisicao feita');
                            if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.
                                $scope.dadosFinalizacaoCompra.rua = dados.logradouro;
                                $scope.dadosFinalizacaoCompra.bairro = dados.bairro;
                                $scope.dadosFinalizacaoCompra.cidade = dados.localidade;
                                $scope.dadosFinalizacaoCompra.uf = dados.uf;
                                $('#rua').focus();
                                $('#bairro').focus();
                                $('#rua').focus();
                            } //end if.
                            else {
                                //CEP pesquisado não foi encontrado.
                                alert("CEP não encontrado.");
                            }
                            //$("md-dialog").LoadingOverlay("hide", true);
                        });
                    } //end if.
                    else {
                        //cep é inválido.
                        console.log("Formato de CEP inválido.");
                    }
                } //end if.
                else {
                    //cep sem valor

                }
            };

            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();
            };

            $scope.alterarQtdProdutos = function (operacao, produto) {
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

            var addressRequest = $http.get('http://67.205.164.145/api/client/1/address')
                     .then(function(response){
                        $scope.addresses = response.data;
                     });
            addressRequest.then(function(addresses) {
                console.log($scope.addresses);
            });
            $scope.showModal = function (event, dadosProduto) {
                console.log('dadosProduto = ', dadosProduto);
                $mdDialog.show({
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'modal-finalizar-compra.html',
                    controller: function DialogController($scope, $mdDialog) {
                        $scope.closeDialog = function () {
                            $mdDialog.hide();
                        };
                    }
                });
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
            if (oQue === 'preco')
                return $scope.valorTotal;
            else if (oQue === 'quantidade')
                return $scope.qtdTotal;
            else
                console.error('Erro na função atualizarTotal()!! ');
        };
        $scope.selectAddress = function (address){
            $scope.address = address;
            console.log($scope.address);
        };

        $scope.formasPgto = [
            {'formaPgto': 'Cartão de crédito'},
            {'formaPgto': 'Cartão de débito'},
            {'formaPgto': 'Boleto bancário'}
        ];
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
