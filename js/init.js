;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    game = Boggle.game = new Boggle.Game();
    game.start();
    //
    // window.addEventListener("resize", game.board.resizeCells.bind(game.board));
    // document.addEventListener("DOMContentLoaded", game.board.resizeCells.bind(game.board));

})(window);