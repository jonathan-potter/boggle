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

        this.listWords(this.searchGrid());
    };

    Game.prototype.listWords = function (words) {
        var listItem, wordList;

        wordList = document.getElementById('word-list');
        _.each(words, function (word) {
            listItem = document.createElement('li');

            listItem.innerHTML = word;

            wordList.appendChild(listItem);
        });
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
                    words: words,
                    trie: self.dictionary.trie
                });
            });
        });

        return words;
    };

    Game.prototype.search = function (status) {
        var currentLetters, detected, highlightedCells, self;

        self = this;
        highlightedCells = [];

        if (!(self.board.board[status.x] && self.board.board[status.x][status.y]) || status.visited[status.x][status.y]) { return; };

        currentLetters = status.currentLetters || '';
        currentLetters = currentLetters + (self.board.board[status.x][status.y]).toLowerCase();

        if (status.trie[currentLetters]) {
            highlightedCells.push(self.board.highlightCell({x: status.x, y: status.y}));

            if (status.trie[currentLetters].word && currentLetters.length > 1) {
                status.words.push(currentLetters);
            }

            status.visited[status.x][status.y] = true;

            _.each([-1, 0, 1], function (dx) {
                _.each([-1, 0, 1], function (dy) {
                    if (dx === 0 ^ dy === 0) {
                        self.search({
                            x: status.x + dx,
                            y: status.y + dy,
                            visited: _.cloneDeep(status.visited),
                            words: status.words,
                            currentLetters: currentLetters,
                            trie: status.trie[currentLetters]
                        });
                    }
                });
            });
            self.board.removeHighlights(highlightedCells);
        } else {
            self.board.removeHighlights(highlightedCells);
        }
    };

})(window);