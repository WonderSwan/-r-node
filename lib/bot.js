var reddit = require( 'redwrap' );
var Twit = require( 'twit' );
var config;

if ( 'development' === process.env.NODE_ENV ) {
  config = require( './config' );
} else {
  config = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
  };
}

var t = new Twit( config );

function getReddit() {
  var posts;
   var num = Math.floor( Math.random() * 25 );

  reddit.r('node', function ( err, data, res ) {
    posts = data.data.children;
    postToTwitter(posts[num]);
  });
}

function postToTwitter( post ) {
  var status = '' + post.data.title + ' ' + post.data.url;

  t.post('statuses/update', { status: status }, function ( err, data, response ) {
    if ( err ) {
      console.log( err );
      setTimeout( function () {
        getReddit();
      }, 300000 ); // wait five minutes and try again.
    }

    console.log( 'Posted successfully.' );
  });
}

function randomNum() {
  return Math.floor( Math.random() * 25 );
}

module.exports = getReddit;