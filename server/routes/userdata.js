// Dependencies
const express   = require('express');
const router    = express.Router();
const UserData  = require('../models/userData');

// Get User Data By Username 
router.get('/:username', function(req, res){
    console.log('Request: Get User Data By Username.');
    UserData.getUserDataByUsername(req.params.username, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
        console.log('Success: Found User Data.');
    });
});

// Update Or Create User Data
router.put('/:username', function(req, res){
    console.log('Request: Update User Data.');
    var username = req.params.username;
    var body = req.body;
    var options = {
        'upsert': true
    };
    UserData.updateWebsite(username, body, options, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
        console.log('Success: User Data Updated.');
    });
});

// Delete To Do Item
router.delete('/:username/:item', function(req, res){
    console.log('Request: Delete Item In To Do List.');
    var username = req.params.username;
    var item = req.params.item;
    var options = {
        'upsert': false
    };
    UserData.deleteWebsite(username, item, options, function(err, ret){
        if(err){
            throw err;
        }
        res.json(ret);
        console.log('Success: Item Removed.');
    });
});

// Export the router
module.exports = router;