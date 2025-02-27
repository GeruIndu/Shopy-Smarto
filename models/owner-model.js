const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    contact: Number,
    products: {
        type: Array,
        default: []
    },
    gstin: String,
    profile: String
})

module.exports = mongoose.model('owner', ownerSchema);