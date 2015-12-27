var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Quote = require('./models/quotes');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

//mongoose.connect('mongodb://localhost:27017/quotes');
//mongoose.connect('mongodb://jasim:jasim@ds037095.mongolab.com:37095/helloworld');

//mongoose.connect('mongodb://jasim:jasim@iad1-mongos0.objectrocket.com:16084/qoutes');

mongoose.connect('mongodb://jasim:jasim@ds037095.mongolab.com:37095/heroku_ls58mq68');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var port = process.env.PORT|| 8081;

var router = express.Router();
var bool = true;
var i=2;
app.get('/scrape',function(req,res){

  var quoteUrl = 'https://www.goodreads.com/quotes';
  var quoteUrl = 'http://www.brainyquote.com/quotes/topics/topic_inspirational3.html';
//while(bool){
  quoteUrl = 'http://www.brainyquote.com/quotes/topics/topic_inspirational'+i+'.html';
  request(quoteUrl, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var quote, author;
      $('.boxyPaddingBig').filter(function(){

        console.log("---------------------------------------------");
        quote = $(this).find('span > a')
        .clone()    //clone the element
        .children() //select all the children
        .remove()   //remove all the children
        .end()  //again go back to selected element
        .text();
        author = $(this).find('.bq-aut > a').clone().children().remove().end().text();

        console.log(quote+"//////"+author);
        //var authors = $(this).children('.authorOrTitle');
        //author = $(authors).eq(0).text();
        //console.log(quote.substring(0,quote.lastIndexOf('"')+1));
        //quote.subst
        var quotes = new Quote();
        quotes.quote = quote;
        quotes.author = author;
        quotes.save(function(err){
          console.log("Saving - data");
          if(err)
            res.send(err);
          //res.json({message:"Qoute Saved"});
        });
      });
    }else {
      bool = false;
    }
  });
  i++;

  //};
  res.json({message:"sraping"});
});


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
      Quote.random(function(err, quotes) {
          if (err)
              res.send(err);

          res.json(quotes);
      });
  });
app.use('/api',router);

app.listen(port);

console.log('Magic happens on port'+port);
