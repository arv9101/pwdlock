// Dependencies
const express   = require('express');
const router    = express.Router();
const jwt       = require('jsonwebtoken');
const User      = require('../models/user');

// Authenticate
router.post('/auth',function(req, res){
    if(!req.body.username){
        res.status(400).send('Username Required.');
        return;
    }
    if(!req.body.password){
        res.status(400).send('Password Required.');
        return;
    }
    User.findOne({ username: req.body.username }, function(err, user){
        if(err){ 
            console.log('Invalid Username');
        }
        user.comparePassword(req.body.password, function(err, isMatch){
            if(err) throw err;
            if(!isMatch){
                res.status(401).send('Invalid Password');
            } else {
                var token = jwt.sign(user,"topsecret");
                res.json({
                    success: true,
                    token: token,
                    username: user.username
                });
                return token;
            }
        });
    })
});

// Check Token Validity
router.get('/check/:token', function(req, res){
    console.log('Checking Validity Of Issued Token');
    var token = req.params.token;
    if(token){
        jwt.verify(token, "topsecret", function(err) {      
            if (err) {
                return res.status(403).json({ success: false, message: 'Invalid token.' });    
                console.log('Invalid token.');
            } else {
                return res.status(200).json({ success: true, message: 'Valid Token' });
                console.log('Valid Token.');
            }
        });
    } else {
        return res.status(403).json({ success: false, message: 'Token Not Provided.' });  
        console.log('Token Not Provided.');
    }
});

// Get User By Username 
router.get('/users/:username', function(req, res){
    console.log('Request: Get User By Username.');
    User.getUserByUsername(req.params.username, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
        console.log('Success: Found User.');
    });
});

// Add New User
router.post('/users', function(req, res){
    console.log('Request: Add New User.');
    User.addUser(req.body, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
        console.log('Success: New User Added.');
    });
});

// Update User
router.put('/users/:username', function(req, res){
    console.log('Request: Search & Update User.');
    var username = req.params.username;
    var body = req.body;
    User.updateUser(username, body, {}, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
        console.log('Success: User Info Updated.');
    });
});

/* Delete User
router.delete('/users/:username', function(req, res){
    console.log('Request: Delete User By Username.');
    User.deleteUser(req.params.username, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
        console.log('Success: User Removed.');
    });
});
*/

// Export the router
module.exports = router;