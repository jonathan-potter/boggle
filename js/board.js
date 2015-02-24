;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    var Board = Boggle.Board = function () {
        this.width = 4;
        this.height = 4 ;
        this.board = Board.generate({ width: this.width, height: this.height });
        this.cells = [];
    };

    var CELL_SIZE = 50;
    var MARGIN_WIDTH_PERCENT = 0.04;

    Board.prototype.render = function () {
        var boggleBoard, cell, cellRow, cellWidthInPercent, letter, self, widthOfMargins;

        self = this;

        boggleBoard = document.getElementById('boggle-board');
        // boggleBoard.style.width = (this.width * CELL_SIZE + 20) + 'px';
        // boggleBoard.style.height = (this.height * CELL_SIZE) + 'px';

        cellRow = document.createElement('div');
        cellRow.classList.add('cell-row');
        _.times(self.width, function (column) {
            _.times(self.height, function (row) {
                cell = document.createElement('li');

                widthOfMargins = (self.width - 1) * MARGIN_WIDTH_PERCENT;
                cellWidthInPercent = 100 * (1 - widthOfMargins) / self.width;

                cell.style.width = cellWidthInPercent + '%';
                cell.style.paddingBottom = cellWidthInPercent + '%';
                cell.style.height = '0';

                cell.id = 'x' + column + 'y' + row;
                cell.classList.add('cell');

                letter = self.board[column][row];

                letterElement = document.createElement('div');
                letterElement.classList.add('letter-element');
                letterElement.innerHTML = letter;

                cell.appendChild(letterElement);

                cellRow.appendChild(cell);
                self.cells.push(cell);

                if (cellRow.children.length === self.width) {
                    boggleBoard.appendChild(cellRow);

                    cellRow = document.createElement('div');
                    cellRow.classList.add('cell-row');
                }
            });
        });
    };

    // Class methods
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
        var listItem, self, uniqueWordCount, uniqueWords, word, wordCount, wordCounts,
        wordList, wordRow, words;

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

        wordRow = document.createElement('div');
        wordRow.classList.add('word-row');
        _.each(uniqueWords, function (word, wordIndex) {
            wordRow.appendChild(self.generateWordListItem({
                word: word,
                wordCount: wordCounts[word],
                locationChains: wordsAndLocationChains.locationChains[word]
            }));
            if (wordRow.children.length === 3) {
                wordList.appendChild(wordRow);

                wordRow = document.createElement('div');
                wordRow.classList.add('word-row');
            }
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
        listItem.classList.add('column');
        listItem.classList.add('one-third');
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