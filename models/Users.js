const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    password: { type: String, required: true, 
        // match: [/^(?=\w*\d)\S{6,}$/, 'La contraseña no tiene un formato válido (deberá de ser de más de 6 caracteres e incluir al menos un número)'] 
    },
    name: {type: String},
    surname: {type: String},
    phone: {type: Number},
    role: {type: String, enum: ['administrador', 'usuario']},
    avatar: String,
    cart: [{ type: mongoose.Types.ObjectId, ref: 'Cart' }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;