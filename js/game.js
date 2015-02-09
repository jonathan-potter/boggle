;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    var Game = Boggle.Game = function () {
        this.board = new Boggle.Board();
        this.dictionary = new Boggle.Dictionary();
    };

    Game.prototype.initialRender = function () {
        var cell;

        cell = document.createElement('div');
    };

    Game.prototype.start = function () {
        this.render();
        this.searchGrid();
    };

    Game.prototype.render = function () {
        this.board.render();
    };

    Game.prototype.searchGrid = function () {
        var visited, self, words;

        self = this;

        words = [];
        _.each(self.board.board, function (column, columnId) {
            _.each(self.board.board, function (row, rowId) {
                visited = Boggle.Board.emptyBoard({
                    width: self.board.width,
                    height: self.board.height
                })

                self.search({
                    x: columnId,
                    y: rowId,
                    visited: visited,
                    words: words
                });
            });
        });
    };

    Game.prototype.search = function (status) {
        var currentLetters, detected, self;

        self = this;

        if (!(self.board.board[status.x] && self.board.board[status.x][status.y]) || status.visited[status.x][status.y]) { return; };

        currentLetters = status.currentLetters || '';
        currentLetters = currentLetters + self.board.board[status.x][status.y];

        detected = _.contains(Boggle.Dictionary.list, currentLetters.toLowerCase())

        if (detected) {
            console.log(currentLetters);
            words.push(currentLetters);
        }

        status.visited[status.x][status.y] = true;

        _.each([-1, 0, 1], function (dx) {
            _.each([-1, 0, 1], function (dy) {
                if (dx === 0 ^ dy === 0)
                self.search({
                    x: status.x + dx,
                    y: status.y + dy,
                    visited: _.cloneDeep(status.visited),
                    words: status.words,
                    currentLetters: currentLetters
                });
            });
        });
    };

})(window);