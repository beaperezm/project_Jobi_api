const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        products: { type:[{
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true, min: [1, "el precio debe ser mayor de 1 siempre"]},
            category: { type: String, 
                        enum: {
                        values: ["libros", "juguetes", "ropa", "videojuegos"],
                        message: "Esta no es una categoria de nuestros productos web"
                    } },
            description: String,
            stock: { type: Number, required: true},
            type: [String],
            author: [String],
            pages: Number,
            editorial: String,
            languague: String,
            bookbinding: String,
            yearEdition: Number,
            isbn: Number,
            size: String,
            color: String,
            platform: String,
            decades: String,
            brand: String,
            subcategory: String,
            tags: { type: [String] },
            materials: { type: [String] },
            age: String
        }] } ,
        user: { type: String }
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;