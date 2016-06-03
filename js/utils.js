;(function (root) {

    var Boggle = root.Boggle = (root.Boggle || {});

    var Utils = Boggle.Utils = {};

    Utils.randomLetter = function () {
        return _.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    };

    Utils.parseLocationHash = function (query) {
      query = query || window.location.hash

      var keyValuePairs;
      if (query.length > 0) {
        keyValuePairs = query.slice(1).split('&');
      } else {
        keyValuePairs = [];
      }

      return keyValuePairs.reduce(function(hash, keyValuePair) {
        var split = keyValuePair.split('=');
        key = split[0];
        value = split[1];

        if (value && isNaN(value)) {
          hash[key] = value;  
        } else {
          hash[key] = parseFloat(value);
        }

        return hash;
      }, {});
    }

})(window);
