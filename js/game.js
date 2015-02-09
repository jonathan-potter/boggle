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

        Boggle.Board.listWords(this.searchGrid());
    };

    Game.prototype.render = function () {
        this.board.render();
    };

    Game.prototype.searchGrid = function () {
        var locationChains, self, visited, words;

        self = this;

        words = [];
        locationChains = {};
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
                    trie: self.dictionary.trie,
                    locationChains: locationChains,
                    locationChain: []
                });
            });
        });

        return {words: words, locationChains: locationChains};;
    };

    Game.prototype.search = function (status) {
        var currentLetters, detected, self, locationChain;

        self = this;
        highlightedCells = [];

        if (!(self.board.board[status.x] && self.board.board[status.x][status.y]) || status.visited[status.x][status.y]) { return; };

        currentLetters = status.currentLetters || '';
        currentLetters = currentLetters + (self.board.board[status.x][status.y]).toLowerCase();

        locationChain = _.cloneDeep(status.locationChain);
        locationChain.push({x: status.x, y: status.y});

        if (status.trie[currentLetters]) {

            if (status.trie[currentLetters].word && currentLetters.length > 1) {
                status.words.push(currentLetters);
                status.locationChains[currentLetters] = status.locationChains[currentLetters] || [];
                _.each(locationChain, function (location) {
                    status.locationChains[currentLetters].push(location);
                });
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
                            trie: status.trie[currentLetters],
                            locationChain: locationChain,
                            locationChains: status.locationChains
                        });
                    }
                });
            });
        }
    };

})(window);