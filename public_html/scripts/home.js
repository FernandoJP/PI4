
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast) {
        if (JSON.parse(localStorage.getItem("produtos"))) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
        } else {
            $scope.qtdProdutosCarrinho = 0;
        }

        $scope.produtos = [
            {nome: 'Uma Pergunta por Dia',
                preco: 'R$57,00',
                descricao: '<p>Todos os dias criamos uma imensa quantidade de registros em celulares, redes sociais e aplicativos. </p><p>No entanto, quase nunca temos o hábito de retornar a eles. <br />Às vezes podem parecer só besteiras, mas quantos desses relatos não mostrariam nosso crescimento e nossas mudanças em todos esses anos? Uma pergunta por dia convida você a registrar suas respostas a uma variedade de questões, das mais simples às mais complicadas, como “Para onde você quer fazer sua próxima viagem?” ou “Escreva a primeira linha da sua autobiografia”. </p><p>Em cada página há espaço para cinco respostas, uma por ano, ao longo de cinco anos. Com o passar do tempo, quando voltar a um dia já anotado, o dono do diário encontrará seus pensamentos anteriores, num exercício divertido e construtivo de recordar e refletir.</p>',
                img: 'images/livro-o-poder-do-habito.jpg'
            },
            {nome: 'O Poder do Hábito',
                preco: 'R$50,00',
                descricao: '<p>Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. </p><p>Parou de fumar, correu uma maratona e foi promovida. Em um laboratório, neurologistas descobriram que os padrões dentro do cérebro dela – ou seja, seus hábitos – foram modificados de maneira fundamental para que todas essas mudanças ocorressem. Há duas décadas pesquisando ao lado de psicólogos, sociólogos e publicitários, cientistas do cérebro começaram finalmente a entender como os hábitos funcionam – e, mais importante, como podem ser transformados. </p><p>Embora isoladamente pareçam ter pouca importância, com o tempo, têm um enorme impacto na saúde, na produtividade, na estabilidade financeira e na felicidade. Com base na leitura de centenas de artigos acadêmicos, entrevistas com mais de trezentos cientistas e executivos, além de pesquisas realizadas em dezenas de empresas, o repórter investigativo do New York Times Charles Duhigg elabora, em O Poder do Hábito, um argumento animador: a chave para se exercitar regularmente, perder peso, educar bem os filhos, se tornar uma pessoa mais produtiva, criar empresas revolucionárias e ter sucesso é entender como os hábitos funcionam. Transformá-los pode gerar bilhões e significar a diferença entre fracasso e sucesso, vida e morte.</p>',
                img: 'images/livro-uma-pergunta.jpg'
            },
            {nome: 'O Poder do Hábito',
                preco: 'R$50,00',
                descricao: 'Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. Parou de fumar, correu uma maratona e foi promovida. Em um laboratório, neurologistas descobriram que os padrões dentro do cérebro dela – ou seja, seus hábitos – foram modificados de maneira fundamental para que todas essas mudanças ocorressem. Há duas décadas pesquisando ao lado de psicólogos, sociólogos e publicitários, cientistas do cérebro começaram finalmente a entender como os hábitos funcionam – e, mais importante, como podem ser transformados. Embora isoladamente pareçam ter pouca importância, com o tempo, têm um enorme impacto na saúde, na produtividade, na estabilidade financeira e na felicidade. Com base na leitura de centenas de artigos acadêmicos, entrevistas com mais de trezentos cientistas e executivos, além de pesquisas realizadas em dezenas de empresas, o repórter investigativo do New York Times Charles Duhigg elabora, em O Poder do Hábito, um argumento animador: a chave para se exercitar regularmente, perder peso, educar bem os filhos, se tornar uma pessoa mais produtiva, criar empresas revolucionárias e ter sucesso é entender como os hábitos funcionam. Transformá-los pode gerar bilhões e significar a diferença entre fracasso e sucesso, vida e morte.',
                img: 'images/livro-uma-pergunta.jpg'
            },
            {nome: 'O Poder do Hábito',
                preco: 'R$50,00',
                descricao: 'Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. Parou de fumar, correu uma maratona e foi promovida. Em um laboratório, neurologistas descobriram que os padrões dentro do cérebro dela – ou seja, seus hábitos – foram modificados de maneira fundamental para que todas essas mudanças ocorressem. Há duas décadas pesquisando ao lado de psicólogos, sociólogos e publicitários, cientistas do cérebro começaram finalmente a entender como os hábitos funcionam – e, mais importante, como podem ser transformados. Embora isoladamente pareçam ter pouca importância, com o tempo, têm um enorme impacto na saúde, na produtividade, na estabilidade financeira e na felicidade. Com base na leitura de centenas de artigos acadêmicos, entrevistas com mais de trezentos cientistas e executivos, além de pesquisas realizadas em dezenas de empresas, o repórter investigativo do New York Times Charles Duhigg elabora, em O Poder do Hábito, um argumento animador: a chave para se exercitar regularmente, perder peso, educar bem os filhos, se tornar uma pessoa mais produtiva, criar empresas revolucionárias e ter sucesso é entender como os hábitos funcionam. Transformá-los pode gerar bilhões e significar a diferença entre fracasso e sucesso, vida e morte.',
                img: 'images/livro-uma-pergunta.jpg'
            },
            {nome: 'O Poder do Hábito',
                preco: 'R$50,00',
                descricao: 'Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. Parou de fumar, correu uma maratona e foi promovida. Em um laboratório, neurologistas descobriram que os padrões dentro do cérebro dela – ou seja, seus hábitos – foram modificados de maneira fundamental para que todas essas mudanças ocorressem. Há duas décadas pesquisando ao lado de psicólogos, sociólogos e publicitários, cientistas do cérebro começaram finalmente a entender como os hábitos funcionam – e, mais importante, como podem ser transformados. Embora isoladamente pareçam ter pouca importância, com o tempo, têm um enorme impacto na saúde, na produtividade, na estabilidade financeira e na felicidade. Com base na leitura de centenas de artigos acadêmicos, entrevistas com mais de trezentos cientistas e executivos, além de pesquisas realizadas em dezenas de empresas, o repórter investigativo do New York Times Charles Duhigg elabora, em O Poder do Hábito, um argumento animador: a chave para se exercitar regularmente, perder peso, educar bem os filhos, se tornar uma pessoa mais produtiva, criar empresas revolucionárias e ter sucesso é entender como os hábitos funcionam. Transformá-los pode gerar bilhões e significar a diferença entre fracasso e sucesso, vida e morte.',
                img: 'images/livro-uma-pergunta.jpg'
            },
            {nome: 'O Poder do Hábito',
                preco: 'R$50,00',
                descricao: 'Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. Parou de fumar, correu uma maratona e foi promovida. Em um laboratório, neurologistas descobriram que os padrões dentro do cérebro dela – ou seja, seus hábitos – foram modificados de maneira fundamental para que todas essas mudanças ocorressem. Há duas décadas pesquisando ao lado de psicólogos, sociólogos e publicitários, cientistas do cérebro começaram finalmente a entender como os hábitos funcionam – e, mais importante, como podem ser transformados. Embora isoladamente pareçam ter pouca importância, com o tempo, têm um enorme impacto na saúde, na produtividade, na estabilidade financeira e na felicidade. Com base na leitura de centenas de artigos acadêmicos, entrevistas com mais de trezentos cientistas e executivos, além de pesquisas realizadas em dezenas de empresas, o repórter investigativo do New York Times Charles Duhigg elabora, em O Poder do Hábito, um argumento animador: a chave para se exercitar regularmente, perder peso, educar bem os filhos, se tornar uma pessoa mais produtiva, criar empresas revolucionárias e ter sucesso é entender como os hábitos funcionam. Transformá-los pode gerar bilhões e significar a diferença entre fracasso e sucesso, vida e morte.',
                img: 'images/livro-uma-pergunta.jpg'
            }
        ];
        $scope.showCustom = function (event, dadosProduto) {
            $mdDialog.show({
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                template: '<md-dialog class="dialog-detalhes-livro">' +
                        '<md-dialog-content>' +
                        '<h1>' + dadosProduto.nome + '</h1>' +
                        '<img class="dialog-img-livro" src="' + dadosProduto.img + '" title="Livro ' + dadosProduto.nome + '. " alt="Livro ' + dadosProduto.nome + '. "/>' +
                        '<div class="dialog-descricao-livro"><p>' + dadosProduto.descricao + '</p></div>' +
                        '</md-dialog-content>' +
                        '<md-dialog-actions layout="row">' +
                        '<div class="dialog-preco-livro">Preço:<span>' + dadosProduto.preco + '</span></div>' +
                        '<span flex></span>' +
                        '<md-button class="md-icon-button"><i class="material-icons">add_shopping_cart</i></md-button>' +
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

        $scope.alterarQtdProdutos = function (operacao) {
            if ($scope.qtdProdutos) {
                if (operacao == 'adicionar') {
                    $scope.qtdProdutos++;

                } else if (operacao == 'remover') {
                    if ($scope.qtdProdutos != 1) {
                        $scope.qtdProdutos--;
                    }
                }
            } else {
                $scope.qtdProdutos = 1;
            }
        };

        $scope.adicionarAoCarrinho = function (produto) {
            if (JSON.parse(localStorage.getItem("produtos"))) {
                var itensAdicionados = JSON.parse(localStorage.getItem("produtos"));
            } else {
                var itensAdicionados = [];
            }
            itensAdicionados.push({nome: produto.nome, preco: produto.preco, img: produto.img});
            localStorage.setItem("produtos", JSON.stringify(itensAdicionados));
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //atualizando no badge de carrinhos
            $scope.showToast(produto.nome); //mostrando o toast com a ação de desfazer
        };

        $scope.showToast = function (nomeProduto) {
            var toast = $mdToast.simple()
                    .textContent('Livro adicionado com sucesso no carrinho. ')
                    .action('Desfazer')
                    .highlightAction(false)
                    .hideDelay(5000)
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
                    $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length;//atualizando no badge de carrinhos
                }

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
