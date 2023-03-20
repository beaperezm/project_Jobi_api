const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true, min: [1, "el precio debe ser mayor de 1 siempre"]},
        category: { type: [String], 
                    enum: {
                    values: ["libros", "juguetes", "ropa", "videojuegos"],
                    message: "Esta no es una categoria de nuestros productos web"
                } },
        stock: { type: Number, required: true},
        type: [String],
        products: [{ type: mongoose.Types.ObjectId, ref: 'Product' } ],
        users: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;