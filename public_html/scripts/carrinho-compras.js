
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast) {
        if (JSON.parse(localStorage.getItem("produtos"))) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
        } else {
            $scope.qtdProdutosCarrinho = 0;
        }

        $scope.carrinho = [
            {nome: 'Uma Pergunta por Dia',
                preco: 'R$57,00',
                descricao: '<p>Todos os dias criamos uma imensa quantidade de registros em celulares, redes sociais e aplicativos. </p><p>No entanto, quase nunca temos o hábito de retornar a eles. <br />Às vezes podem parecer só besteiras, mas quantos desses relatos não mostrariam nosso crescimento e nossas mudanças em todos esses anos? Uma pergunta por dia convida você a registrar suas respostas a uma variedade de questões, das mais simples às mais complicadas, como “Para onde você quer fazer sua próxima viagem?” ou “Escreva a primeira linha da sua autobiografia”. </p><p>Em cada página há espaço para cinco respostas, uma por ano, ao longo de cinco anos. Com o passar do tempo, quando voltar a um dia já anotado, o dono do diário encontrará seus pensamentos anteriores, num exercício divertido e construtivo de recordar e refletir.</p>',
                img: 'images/livro-o-poder-do-habito.jpg'
            }
        ];
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
