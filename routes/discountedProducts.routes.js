const express = require ('express');
const DiscountedProduct = require('../models/DiscountedProducts.js');
const createError = require('../utils/errors/create-error.js');

const discountedProductsRouter = express.Router();

discountedProductsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await DiscountedProduct.find();
        return res.status(200).json(allProducts);
    } catch (error) {
        next(error)
    }
});

discountedProductsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await DiscountedProduct.findById(id);
        if(product) {
            return res.status(200).json(product);
        } else {
            next(createError("No existe un producto rebajado con ese id", 404));
        }
    } catch (err) {
        next(err);
    }
});

discountedProductsRouter.get('/name/:name', async (req, res, next) => {
    try {
        const nameProduct = req.params.name;
        const product = await DiscountedProduct.find({ name: nameProduct });
        if (product.length === 0) {
            return next(createError(`No hay ningún producto rebajado con ese nombre: ${nameProduct}`, 404))
        }
        return res.status(200).json(product);
    } catch (error) {
        next(error)
    }
});

discountedProductsRouter.get('/category/:category', async (req, res, next) => {
    const categoryProduct = req.params.category;
    try {
        const product = await DiscountedProduct.find(
            { 
                category: { $in: categoryProduct }
            },
        );
        if (product.length === 0) {
            return next(createError(`No hay ningún producto rebajado con esa categoría: ${categoryProduct}`, 404))
        }
        return res.status(200).json(product);
    } catch (error) {
        next(error)
    }
});

module.exports = discountedProductsRouter;