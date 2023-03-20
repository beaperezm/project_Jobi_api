const mongoose = require('mongoose');

const garmentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true, min: [1, "el precio debe ser mayor de 1 siempre"]},
        category: { type: String, 
                    enum: {
                    values: ["libros", "juguetes", "ropa", "videojuegos"],
                    message: "Esta no es una categoria de nuestros productos web"
                } },
        description: String,
        stock: { type: Number, required: true},
        size: String,
        color: String
    },
    {
        timestamps: true
    }
);

const Garment = mongoose.model('Garment', garmentSchema);

module.exports = Garment;