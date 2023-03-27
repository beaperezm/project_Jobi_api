const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        products: { type:[{}] },

        user: { type: String }
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;