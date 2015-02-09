;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    var Dictionary = Boggle.Dictionary = function () {
        this.trie = {};
        this.populate();
    };

    Dictionary.prototype.populate = function () {
        var self = this;

        _.each(Boggle.originalDictionary, function (word) {
            self.add(word, self.trie, 0);
        });
    };

    Dictionary.prototype.add = function (word, trie, layer) {
        if (!word[layer]) { return; }

        substring = word.slice(0, layer + 1);
        trie[substring] = trie[substring] || {};

        this.add(word, trie[substring], layer + 1);
    };

})(window);