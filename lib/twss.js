(function() {
  var TWSS, rawData;
  rawData = require('./twss_data').rawData;
  exports.TWSS = TWSS = (function() {
    function TWSS() {
      this.db = rawData.split("\n");
    }
    return TWSS;
  })();
}).call(this);
