const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        products: [{ type:[{}], ref: 'Product' } ],
        user: { type: mongoose.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;