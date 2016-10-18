var express = require('express');
var router = express.Router();

var map = require('./map' );

function sendSSE(req, res, data) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  var id = (new Date()).toLocaleTimeString();
  constructSSE(id, 'new Connection');
}
function constructSSE( id, data) {
    for( var res1 in map ) {
        map[ res1 ].res.write('id: ' + id + '\n');
        map[ res1 ].res.write("data: " + data + '\n\n');
    }
    
}
/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.headers.accept && req.headers.accept == 'text/event-stream') {
        map[req.session.id] = {
            req,
            res
        };
        sendSSE(req, res, '');
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({"json":"response"}));
        res.end();
    }
});

router.post('/post', function(req, res, next) {
    console.log(req.body);
    constructSSE( (new Date()).toLocaleTimeString(), req.body.message);
    res.end('');
});


router.get('/close', function(req, res, next) {
    var session = map[req.session.id]
    if(session){
        session.res.end();
    }
    res.close();
});

module.exports = router;
