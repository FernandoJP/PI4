
var app = angular.module('StarterApp', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', '$mdToast', '$http', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $http) {
        if (localStorage.getItem("produtos") && localStorage.getItem("produtos").length > 0) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
            $scope.carrinho = JSON.parse(localStorage.getItem("produtos"));
        }


        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };


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

$(function () {
    var dados = [];
    var idDeletado;
    $.ajax({
        url: "http://67.205.164.145/api/book"
    }).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            var obj = {
                 "ID": data[i].id,
                "Livro": data[i].title,
                "Autor":data[i].author,
                "ISBN":data[i].isbn,
                "Ano de publicação":data[i].year_published,
                "Editora":data[i].editor,
                "Preço":data[i].price,      
            }
            dados.push(obj);
        }
        
        console.log(data);
        
            $("#jsGrid").jsGrid({
        width: "100%",
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        data: dados,
        fields: [
            {name: "ID", type: "text", width: 30},
            {name: "Livro", type: "text", width: 150},
            {name: "Autor", type: "text", width: 80},
            {name: "ISBN", type: "number", width: 80},
            {name: "Ano de publicação", type: "number", width: 70},
            {name: "Editora", type: "text", width: 70},
            {name: "Preço", type: "number", width: 70},
            {type: "control"}
        ]
    });
            $('.jsgrid-delete-button').click(function() {
               console.log(idDeletado);
    });
    $('.jsgrid-alt-row, .jsgrid-row').mouseenter(function(){
        idDeletado = $('.jsgrid-selected-row td').first().html();
    });
    });
    /*$.ajax({
    url: 'http://67.205.164.145/api/book/27',
    type: 'DELETE',
    success: function(result) {
       console.log(result);
    }
});*/
});

