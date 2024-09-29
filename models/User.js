const mongoose = require('mongoose');
const bycrpt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true
    }
});

//creeating hash before saving the user
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bycrpt.hash(this.password, 2);
    next();
})

//compare the password stored
userSchema.methods.comparePassword = function(password) {
    return bycrpt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
