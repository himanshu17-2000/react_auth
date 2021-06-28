const mongoose = require("mongoose")
const crypt = require('bcrypt')
const SALT_I = 10
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({

    email: {
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    token:{
        type : String,

    }


})

userSchema.methods.comparePassword = function(candidatePassword , cb){
    crypt.compare(candidatePassword, this.password , function(err, ismatch){
        if (err) {
            throw cb(err)
        }
        else{
            
            cb(null ,ismatch)
        }
    })
}
userSchema.methods.generateToken = function(cb){
    var user = this 
    var token = jwt.sign(user._id.toHexString(),'supersecret')
    user.token = token
    user.save(function(err,user){
        if(err){
            cb(err)
        }
        else{
            cb(null,user)
        }
    })
}

userSchema.pre('save', function (next){
    var user = this;
    if (user.isModified('password')) {
        crypt.genSalt(SALT_I, function (err, salt) {
            if (err) return next(err)
            crypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;
                next()

            })
        })
    }
    else{
        next();
    }


})


const user = mongoose.model('user', userSchema)

module.exports = { user }