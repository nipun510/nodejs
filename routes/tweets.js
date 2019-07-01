const express  = require('express');
const bodyParser = require('body-parser');
const Twitter = require('twitter')
const config = require('../config_twitter.js')
const tweetRouter = express.Router();
tweetRouter.use(bodyParser.json());

function prepareResponse(tweets){
  results = []
  tweets.statuses.forEach(function(item, index, array){
  res = {}
  res.id = item.id_str;
  res.text = item.text;
  res.user = item.user.name;
  res.user_desc = item.user.description;
  //res.url = item.entities.urls[0].url;
  results.push(res);
  });
  return results;
}


tweetRouter.route('/')
.get((req, res, next) => {
  const client = new Twitter(config);
  const params = {
    q : req.query.term,
    count : req.query.count,
    //tweet_mode = 'extended',
    //result_type: 'recent',
    lang : 'en'
  }
  client.get('search/tweets', params, (err, tweets, response) => {
  if(err){
   res.json({result : err});
   return;
  }
  response = prepareResponse(tweets);
  res.status = 200;
  res.json(response);
  })

});

module.exports = tweetRouter;
