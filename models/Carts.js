const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        products: [{ type: {
            id: mongoose.Types.ObjectId,
            stock: Number
        }, ref: 'Product' } ],
        users: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;