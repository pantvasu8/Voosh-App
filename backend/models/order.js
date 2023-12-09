const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: String,
    sub_total: Number,
    phone_number: String,
});

module.exports = mongoose.model('Order', orderSchema);