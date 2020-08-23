const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
email: {
     type: String,
     required: true,
     unique: true,
     lowercase: true
}
});

const Subscribers = mongoose.model('subscribers',subSchema);

module.exports = Subscribers; 