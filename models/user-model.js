const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    contact: Number,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    order: {
        type: Array,
        default: []
    },
    address: {
        type: Array,
        default: []
    },
    profile: String
})

module.exports = mongoose.model('user', userSchema);