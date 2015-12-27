var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Quote = require('./models/quotes');
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/quotes');
//mongoose.connect('mongodb://jasim:jasim@ds037095.mongolab.com:37095/helloworld');

//mongoose.connect('mongodb://jasim:jasim@iad1-mongos0.objectrocket.com:16084/qoutes');

mongoose.connect('mongodb://jasim:jasim@ds037095.mongolab.com:37095/heroku_ls58mq68');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT|| 8081;

var router = express.Router();

router.get('/',function(req,res){
  res.json({message:"hooray"});
});

router.route('/quotes').post(function(req,res){

console.log("Posted Message - "+req.body.quote+"  "+req.body.author);
  var quotes = new Quote();
  quotes.quote = req.body.quote;
  quotes.author = req.body.author;
  quotes.save(function(err){
console.log("Saving - data");
    if(err)
      res.send(err);
    res.json({message:"Qoute Saved"});
  });

})
.get(function(req, res) {
      console.log("Get Data");
      Quote.find(function(err, quotes) {
          if (err)
              res.send(err);

          res.json(quotes);
      });
  });
app.use('/api',router);

app.listen(port);

console.log('Magic happens on port'+port);
