// Dependencies
const express   = require('express');
const router    = express.Router();
const crypto    = require('crypto');

// Decryption
function decrypt(text,password,algorithm){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

// Update Or Create User Data
router.post('/', function(req, res){
    console.log('Request: Decryption.');
    var decrypted = {
        'pwd':   decrypt(req.body.pwd, req.body.key, req.body.algorithm),
        'uname': decrypt(req.body.uname, req.body.key, req.body.algorithm)
    }
    res.json(decrypted);
});

// Update Or Create User Card
router.post('/card/', function(req, res){
    console.log('Request: Decryption.');    
    var decrypted = {
        'name':     decrypt(req.body.name, req.body.key, req.body.algorithm),
        'digits':   decrypt(req.body.digits, req.body.key, req.body.algorithm),
        'exp':      decrypt(req.body.exp, req.body.key, req.body.algorithm)
    }
    res.json(decrypted);
});

// Export the router
module.exports = router;