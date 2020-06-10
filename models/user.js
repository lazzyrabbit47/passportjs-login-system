const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const argon = require('argon2');

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
    },
    email: {
       type:String,
       required: true 
    },
    hashedPassword:{
        type: String,
    }
});

userSchema.methods.setPassword = async function (password) {
    this.hashedPassword = await argon.hash(password);
}

userSchema.methods.validatePassword = async function (password) {
    console.log(this.hashedPassword);
    console.log(password);
    return await argon.verify(this.hashedPassword, password);
}

module.exports = mongoose.model('User', userSchema);
// mongoose.model('users', userSchema);