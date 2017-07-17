// Dependencies
const express   = require('express');
const router    = express.Router();
const UserData  = require('../models/userData');

// Get User Cards By Username 
router.get('/:username', function(req, res){
    console.log('Request: Get User Card By Username.');
    UserData.getUserDataByUsername(req.params.username, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
        console.log('Success: Found User.');
    });
});

// Update Or Create User Card
router.put('/:username', function(req, res){
    console.log('Request: Update User Card.');
    var username = req.params.username;
    var body = req.body;
    var options = {
        'upsert': true
    };
    UserData.updateCard(username, body, options, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
        console.log('Success: User Card Updated.');
    });
});

// Delete Card
router.delete('/:username/:item', function(req, res){
    console.log('Request: Delete Card.');
    var username = req.params.username;
    var item = req.params.item;
    var options = {
        'upsert': false
    };
    UserData.deleteCard(username, item, options, function(err, ret){
        if(err){
            throw err;
        }
        res.json(ret);
        console.log('Success: Card Removed.');
    });
});

// Export the router
module.exports = router;