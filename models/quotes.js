var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  quote : String,
  author : String
});


QuoteSchema.statics.random = function(cb) {
  this.count(function(err, count) {
    if (err) return cb(err);
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);
  }.bind(this));
};

module.exports = mongoose.model('Quote',QuoteSchema);
