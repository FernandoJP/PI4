        if (localStorage.getItem("produtos") > 0) {
            $scope.qtdProdutosCarrinho = JSON.parse(localStorage.getItem("produtos")).length; //configurar quantidade de itens no carrinho
        } else {
            $scope.qtdProdutosCarrinho = 0;
        }