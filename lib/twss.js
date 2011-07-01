(function() {
  var TWSS;
  module.exports.TWSS = TWSS = (function() {
    TWSS.match = function(text) {
      var twss;
      if (text) {
        twss = new this(text);
        return twss.check();
      } else {
        return false;
      }
    };
    function TWSS(text) {
      this.text = text;
    }
    TWSS.prototype.check = function() {
      if (this.text != null) {
        return !!this.text.match(/\b(he|it|that)\b.*\b(big(ger)?|huger?)\b/);
      }
    };
    return TWSS;
  })();
}).call(this);
