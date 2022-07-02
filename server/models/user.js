const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const crypto  = require('crypto')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 12,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },

    salt: String,
    role: {
        type: String,
        default: 'subscriber'
    },

    resetPasswordLink: {
        deta: String,
        default: ''
    },

    categories: [{
        type: ObjectId,
        ref: 'Category',
        required: true
  }]


},{timestamps:true});

 //virtual field
  userSchema.virtual('password')
    .set(function(password) {
        // create temp varialble called _password

        this._password = password

        //generate sale

        this.salt = this.makesalt()

        //encrypt

        this.hashed_password = this.encryptPassword(password)
    })

    .get(function() {
        return this._password
    })
 // methods > authenticate, encryptPassword, makeSalt
 userSchema.methods ={

    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
     encryptPassword: function(password) {
         if(!password)return ''

         try{
             return crypto.createHmac('sha1', this.salt)
             .update(password)
             .digest('hex');
         } catch(err){
             return ''
         }
     },

     makesalt: function(){
           return Math.round(new Date().valueOf() * Math.random()) + ''
     }
 };
 //export user model

 module.exports = mongoose.model('User', userSchema);