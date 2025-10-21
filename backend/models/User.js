const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true,unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
    //only hash the password if it has been modified or just set for the first time
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next(); //continue saving
});

//Check if the password matches the hashed one in db
userSchema.methods.checkPassword = async function (npassword) {
    return await bcrypt.compare(npassword, this.password);
};

module.exports = mongoose.model('User', userSchema);