;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    var Utils = Boggle.Utils = {};

    Utils.randomLetter = function () {
        return _.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    };

})(window);