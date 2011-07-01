(function() {
  var TWSS;
  module.exports.TWSS = TWSS = (function() {
    TWSS.subjects = /\bs?he|it\b/;
    TWSS.adjectives = /\bbig|huge\b/;
    TWSS.match = function(text) {
      var twss;
      twss = new this(text);
      return twss.check();
    };
    function TWSS(text) {
      this.text = text;
    }
    TWSS.prototype.check = function() {
      return this.text.match(this.subjects) && this.text.match(this.adjectives);
    };
    return TWSS;
  })();
}).call(this);
