var express = require( 'express' );
var app = express();
var http = require( 'http' );
var bot = require ( './lib/bot' );

setInterval(function(){
  bot();
}, 3600000); // one hour

// keep the app from falling asleep
if ( 'production' === app.get( 'env' ) ){
  setInterval(function() {
    http.get('http://rnode.herokuapp.com');
  }, 300000); // ping the app every five minutes

}

app.listen( process.env.PORT || 3000 );
console.log( 'Another app is running...' );