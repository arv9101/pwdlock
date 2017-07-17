// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// Creating Schema
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var USER = module.exports = mongoose.model('user', userSchema, 'users');   
// FYI: Syntax = mongoose.model('<this_model_name>', <schema_name>, '<db_collection_name>'); 

// Get All Users
module.exports.getAllUsers = function(callback){
    USER.find(callback);
}

/* Get User By ID
module.exports.getUserById = function(id, callback){
    USER.findById(id, callback);
}
*/

// Get User By Username
module.exports.getUserByUsername = function(username, callback){
    USER.findOne({ "username": username }, callback);
}

// Add New User
module.exports.addUser = function(userInfo, callback){
    USER.create(userInfo, callback);
}

// Update User
module.exports.updateUser = function(username, userInfo, options, callback){
    var query = { 'username': username };
    var update = {
        fname: userInfo.fname
    }
    USER.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.deleteUser = function(username, callback){
    var query = { 'username': username };
    USER.findOneAndRemove(query, callback);
}