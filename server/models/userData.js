// Dependencies
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const crypto    = require('crypto');

// Encryption   (algorithm = 'aes-256-ctr';)
function encrypt(text,password,algorithm){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
/* Decryption
function decrypt(text,password){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
 */

// Creating Schema
const newSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    websites: [],
    cards: []
});


var MySCHEMA = module.exports = mongoose.model('mySchema', newSchema, 'userdata');   
// FYI: Syntax = mongoose.model('<this_model_name>', <schema_name>, '<db_collection_name>'); 

// Get UserData By Username
module.exports.getUserDataByUsername = function(username, callback){
    MySCHEMA.findOne({ "username": username }, callback);
}

// Update Websites Page
module.exports.updateWebsite = function(username, userInfo, options, callback){
    // Encrypt 
    var cryptedpwd      = encrypt(  userInfo.pwd, userInfo.key, userInfo.algorithm);
    var crypteduname    = encrypt(userInfo.uname, userInfo.key, userInfo.algorithm);
    var query = { 'username': username };
    var update = {
        $push: {
            websites: {
                'pwd': cryptedpwd,
                'uname': crypteduname,
                'website': userInfo.website
            }
        }
    }
    MySCHEMA.findOneAndUpdate(query, update, options, callback);
}

// Delete Item in Websites Page
module.exports.deleteWebsite = function(username, item, options, callback){
    var query = { 'username': username };
    var update = {
        $pull: {
            websites:{
                'website': item
            }
        }
    }
    MySCHEMA.findOneAndUpdate(query, update, options, callback);
}



// Update Cards Page
module.exports.updateCard = function(username, userInfo, options, callback){
    // Encrypt 
    var cryptedname      = encrypt(userInfo.name, userInfo.key, userInfo.algorithm);
    var crypteddigits    = encrypt(userInfo.digits, userInfo.key, userInfo.algorithm);
    var cryptedexp       = encrypt(userInfo.exp, userInfo.key, userInfo.algorithm);

    var query = { 'username': username };
    var update = {
        $push: {
            cards: {
                'exp': cryptedexp,
                'digits': crypteddigits,
                'name': cryptedname,
                'bank': userInfo.bank
            }
        }
    }
    MySCHEMA.findOneAndUpdate(query, update, options, callback);
}

// Delete Item in Cards Page
module.exports.deleteCard = function(username, item, options, callback){
    var query = { 'username': username };
    var update = {
        $pull: {
            cards:{
                'digits': item
            }
        }
    }
    MySCHEMA.findOneAndUpdate(query, update, options, callback);
}

/* Types of Algorithm Available

[ 'CAST-cbc',
  'aes-128-cbc',
  'aes-128-cbc-hmac-sha1',
  'aes-128-cfb',
  'aes-128-cfb1',
  'aes-128-cfb8',
  'aes-128-ctr',
  'aes-128-ecb',
  'aes-128-gcm',
  'aes-128-ofb',
  'aes-128-xts',
  'aes-192-cbc',
  'aes-192-cfb',
  'aes-192-cfb1',
  'aes-192-cfb8',
  'aes-192-ctr',
  'aes-192-ecb',
  'aes-192-gcm',
  'aes-192-ofb',
  'aes-256-cbc',
  'aes-256-cbc-hmac-sha1',
  'aes-256-cfb',
  'aes-256-cfb1',
  'aes-256-cfb8',
  'aes-256-ctr',
  'aes-256-ecb',
  'aes-256-gcm',
  'aes-256-ofb',
  'aes-256-xts',
  'aes128',
  'aes192',
  'aes256',
  'bf',
  'bf-cbc',
  'bf-cfb',
  'bf-ecb',
  'bf-ofb',
  'blowfish',
  'camellia-128-cbc',
  'camellia-128-cfb',
  'camellia-128-cfb1',
  'camellia-128-cfb8',
  'camellia-128-ecb',
  'camellia-128-ofb',
  'camellia-192-cbc',
  'camellia-192-cfb',
  'camellia-192-cfb1',
  'camellia-192-cfb8',
  'camellia-192-ecb',
  'camellia-192-ofb',
  'camellia-256-cbc',
  'camellia-256-cfb',
  'camellia-256-cfb1',
  'camellia-256-cfb8',
  'camellia-256-ecb',
  'camellia-256-ofb',
  'camellia128',
  'camellia192',
  'camellia256',
  'cast',
  'cast-cbc',
  'cast5-cbc',
  'cast5-cfb',
  'cast5-ecb',
  'cast5-ofb',
  'des',
  'des-cbc',
  'des-cfb',
  'des-cfb1',
  'des-cfb8',
  'des-ecb',
  'des-ede',
  'des-ede-cbc',
  'des-ede-cfb',
  'des-ede-ofb',
  'des-ede3',
  'des-ede3-cbc',
  'des-ede3-cfb',
  'des-ede3-cfb1',
  'des-ede3-cfb8',
  'des-ede3-ofb',
  'des-ofb',
  'des3',
  'desx',
  'desx-cbc',
  'id-aes128-GCM',
  'id-aes192-GCM',
  'id-aes256-GCM',
  'idea',
  'idea-cbc',
  'idea-cfb',
  'idea-ecb',
  'idea-ofb',
  'rc2',
  'rc2-40-cbc',
  'rc2-64-cbc',
  'rc2-cbc',
  'rc2-cfb',
  'rc2-ecb',
  'rc2-ofb',
  'rc4',
  'rc4-40',
  'rc4-hmac-md5',
  'seed',
  'seed-cbc',
  'seed-cfb',
  'seed-ecb',
  'seed-ofb' ]
*/