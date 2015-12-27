var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Quote = require('./models/quotes');
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/quotes');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds037095.mongolab.com:37095/heroku_c9dkvkp2');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT|| 8080;

var router = express.Router();

router.get('/',function(req,res){
  res.json({message:"hooray"});
});

router.route('/quotes').post(function(req,res){
  var quotes = new Quote();
  quotes.quote = req.body.quote;
  quotes.author = req.body.author;
  quotes.save(function(err){
    if(err)
      res.send(err);
    res.json({message:"Qoute Saved"});
  });

})
.get(function(req, res) {
      Quote.find(function(err, quotes) {
          if (err)
              res.send(err);

          res.json(quotes);
      });
  });
app.use('/api',router);

app.listen(port);

console.log('Magic happens on port'+port);
