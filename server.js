var express = require( 'express' );
var app = express();
var http = require( 'http' );
var bot = require ( './lib/bot' );

// call reddit bot every hour
setInterval( function(){
  bot();
}, 3600000 * 2 ); // two hours

// run it on start up also
bot();

// keep the app from falling asleep
if ( 'production' === process.env.NODE_ENV ){
  setInterval( function() {
    http.get( 'http://rnode.herokuapp.com' );
  }, 300000 ); // ping the app every five minutes
}

app.listen( process.env.PORT || 3000 );
console.log( 'Another app is running...' );