
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
    var idDeletado, livroDeletado;
    var idEditado, livroEditado, autorEditado, isbnEditado, anoEditado, editoraEditado, precoEditado;
    $.ajax({
        url: "http://67.205.164.145/api/book"
    }).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            var preco = Number(data[i].price).toFixed(2);
            var obj = {
                "ID": data[i].id,
                "Livro": data[i].title,
                "Autor": data[i].author,
                "ISBN": data[i].isbn,
                "Ano de publicação": data[i].year_published,
                "Editora": data[i].editor,
                "Preço": preco
            };
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
                {name: "ID", type: "text", width: 30, editing: false},
                {name: "Livro", type: "text", width: 150},
                {name: "Autor", type: "text", width: 80},
                {name: "ISBN", type: "text", width: 80},
                {name: "Ano de publicação", type: "number", width: 70},
                {name: "Editora", type: "text", width: 80},
                {name: "Preço", type: "text", width: 50},
                {type: "control"}
            ]
        });
        eventBind();
        function eventBind(){
                               $('.jsgrid-edit-button').click(function () {
            $('.jsgrid-edit-row td input').change(function () {
                idEditado = $('.jsgrid-edit-row td:nth-child(1)').html();
                livroEditado = $('.jsgrid-edit-row td:nth-child(2) input').val();
                autorEditado = $('.jsgrid-edit-row td:nth-child(3) input').val();
                isbnEditado = $('.jsgrid-edit-row td:nth-child(4) input').val();
                anoEditado = $('.jsgrid-edit-row td:nth-child(5) input').val();
                editoraEditado = $('.jsgrid-edit-row td:nth-child(6) input').val();
                precoEditado = $('.jsgrid-edit-row td:nth-child(7) input').val();
                console.log('report: ',idEditado,livroEditado,autorEditado,isbnEditado,anoEditado,editoraEditado,precoEditado);
            });
            $('.jsgrid-update-button').on('click', function () {
                console.log('Iniciado click');            
                $.ajax({
                    url: 'http://67.205.164.145/api/book/' + idEditado,
                    type: 'PUT',
                    data: {
                        title: livroEditado,
                        author: autorEditado,
                        editor: editoraEditado,
                        year_published: anoEditado,
                        price: precoEditado,
                        isbn: isbnEditado
                    },
                    success: function (result) {
                        $.toast({
                            heading: 'Editado com sucesso',
                            text: 'Suas alterações do livro ' + result.title + ' foram salvas com sucesso no sistema.',
                            icon: 'success',
                            hideAfter : 5000
                        });
                                        eventBind();
                    },
                    error: function (data) {
                        console.error(data);
                    }

                });
            });
            
        });
        }

                $('.jsgrid-delete-button').click(function () {
            console.log(idDeletado);
            $.ajax({
                url: 'http://67.205.164.145/api/book/' + idDeletado,
                type: 'DELETE',
                success: function (result) {
                    console.log(result);
                    $.toast({
                        heading: 'Apagado com sucesso',
                        text: 'O livro ' + livroDeletado + ' foi apagado com sucesso da base de dados.',
                        icon: 'success',
                                                    hideAfter : 5000
                    });
                },
                    error: function (data) {
                        console.error(data);
                    }
            });
        });
        
 

        $('.jsgrid-alt-row, .jsgrid-row').mouseenter(function () {
            idDeletado = $('.jsgrid-selected-row td').first().html();
            livroDeletado = $('.jsgrid-selected-row td:nth-child(2)').html();
            //$( ".jsgrid-selected-row" ).off( "click");
            console.log(idDeletado, livroDeletado);
        });


    });
});

