;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    var Board = Boggle.Board = function () {
        this.width = 8;
        this.height = 8;
        this.board = Board.generate({ width: this.width, height: this.height });
    };

    var CELL_SIZE = 50;

    Board.prototype.render = function () {
        var boggleBoard, cell, letter, self;

        self = this;

        boggleBoard = document.getElementById('boggle-board');
        boggleBoard.style.width = this.width * CELL_SIZE + 'px';
        boggleBoard.style.height = this.height * CELL_SIZE + 'px';

        _.times(self.width, function (column) {
            _.times(self.height, function (row) {
                cell = document.createElement('div');

                cell.id = 'x' + column + 'y' + row;
                cell.classList.add('cell');

                letter = self.board[column][row];

                cell.innerHTML = letter;
                boggleBoard.appendChild(cell);
            });
        });
    };

    Board.highlightCell = function (cell) {
        var cell, cellId;

        cellId = 'x' + cell.x + 'y' + cell.y;
        cell = document.getElementById(cellId);

        cell.classList.add('highlighted');

        return cellId;
    };

    Board.removeHighlights = function () {
        var cells;

        cells = document.getElementsByClassName('cell');

        _.each(cells, function (cell) {
            cell.classList.remove('highlighted');
        });
    };

    // Class methods
    Board.generate = function (boardSize) {
        var board;

        board = this.emptyBoard(boardSize);

        board = _.map(board, function (column, x) {
            return _.map(board, function (element, y) {
                return Boggle.Utils.randomLetter();
            });
        });

        return board;
    };

    Board.emptyBoard = function (boardSize) {
        var board;

        board = new Array(boardSize.width);
        board = _.map(board, function () { return new Array(boardSize.height) });

        return board;
    };

    Board.listWords = function (wordsAndLocationChains) {
        var listItem,  self, uniqueWordCount, uniqueWords, word, wordCount, wordCounts, wordList, words;

        self = this;

        wordList = document.getElementById('word-list');

        wordCount = wordsAndLocationChains.words.length;
        words = _.sortBy(wordsAndLocationChains.words, function (letter) { return letter })
        wordCounts = {};
        uniqueWords = _.unique(_.each(words, function (word) {
            if (wordCounts[word]) {
                wordCounts[word] += 1;
            } else {
                wordCounts[word] = 1;
            }
        }));
        uniqueWordCount = uniqueWords.length;

        document.getElementById('word-count').innerHTML = uniqueWordCount + ' words found at ' + wordCount + ' locations.';

        _.each(uniqueWords, function (word) {
            wordList.appendChild(self.generateWordListItem({
                word: word,
                wordCount: wordCounts[word],
                locationChains: wordsAndLocationChains.locationChains[word]
            }));
        });
    };

    Board.generateWordListItem = function (wordMetaData) {
        var aside, div, listItem, location, locationChains, locations, self;

        self = this;

        word =           wordMetaData.word;
        wordCount =      wordMetaData.wordCount;
        locationChains = wordMetaData.locationChains;

        listItem = document.createElement('li');

        listItem.classList.add('listed-word');
        listItem.innerHTML = '<aside>' + wordCount + '</aside>';
        listItem.innerHTML +='<div>' + word + '</div>';

        listItem.addEventListener("mouseover", function (event) {
            word = event.currentTarget.innerHTML;
            locations = locationChains;

            _.each(locations, function (location) {
                self.highlightCell(location)
            });
        });

        listItem.addEventListener('mouseout', self.removeHighlights);

        return listItem;
    };

})(window);