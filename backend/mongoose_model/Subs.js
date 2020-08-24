const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
email: {
     type: String,
     required: true,
     unique: true,
     lowercase: true
}
});


module.exports = mongoose.model('subscriber',subSchema);