;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    var Board = Boggle.Board = function () {
        this.width = 4;
        this.height = 4;
        this.board = Board.generate({ width: this.width, height: this.height });
    };

    var CELL_SIZE = 50;

    Board.prototype.render = function () {
        var boggleBoard, cell, letter, letterContainer, self;

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
                letterContainer = document.createElement('div');
                letterContainer.innerHTML = letter;

                cell.appendChild(letterContainer);
                boggleBoard.appendChild(cell);
            });
        });
    };

    // Class methods
    Board.generate = function (boardSize) {
        var board;

        board = new Array(boardSize.width);
        board = _.map(board, function () { return new Array(boardSize.height) });

        board = _.map(board, function (column, x) {
            return _.map(board, function (element, y) {
                return Boggle.Utils.randomLetter();
            });
        });

        return board;
    };

})(window);