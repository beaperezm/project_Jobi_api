const express = require('express');
const Cart = require('../models/Carts.js');
const createError = require ('../utils/errors/create-errors.js');
const isAuthAdmin = require ('../utils/middlewares/auth-jwt-role.middleware.js');
const uploadToCloudinary = require('../utils/middlewares/cloudinary.middleware.js')

const cartsRouter = express.Router();

cartsRouter.get('/', async (req, res, next) => {
    try {
        const allCarts = await Cart.find().populate('products');
        return res.status(200).json(allCarts);
    } catch (err) {
        next(err);
    }
});

cartsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const cart = await Cart.findById(id).populate('users');
        if (cart) {
            return res.status(200).json(cart);
        } else {
            next(createError('No existe ningún carro con el id indicado', 404));
        }
        
    } catch (err) {
        next(err);
    }
});


cartsRouter.post('/', async (req, res, next) => {
    try {
        const newProductCart = new Cart({ ...req.body });
        const createdProductCart = await newProductCart.save();
        return res.status(201).json(createdProductCart);
        } catch (err) {
        next(err);
    }
});

cartsRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProductCart = await Cart.findByIdAndDelete(id);
        if(!deletedProductCart) {
            return next(createError(`No se encuentra el producto en el carro con el Id: ${id} para eliminarlo`, 404))
        } else {
            return res.status(200).json('Producto del carro eliminado con éxito');
        } 
    } catch (err) {
        next(err);
    }
});

cartsRouter.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const modifiedCart = new Cart({ ...req.body });
        modifiedCart._id = id;
        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            modifiedCart,
            { new: true }
        );
        if(!updatedCart) {
            return next(createError(`No se encuentra el producto en el carro con el Id: ${id} para actualizarlo`, 404))
        }
        return res.status(201).json(updatedCart);
    } catch (err) {
        next(err)
    }
});

module.exports = cartsRouter;