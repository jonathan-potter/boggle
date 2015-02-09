;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    var Game = Boggle.Game = function () {
        this.board = new Boggle.Board();
    };

    Game.prototype.initialRender = function () {
        var cell;

        cell = document.createElement('div');
    };

    Game.prototype.start = function () {
        this.render();
    };

    Game.prototype.render = function () {
        this.board.render();
    };

})(window);