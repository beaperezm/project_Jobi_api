const express = require ('express');
const Product = require('../models/Products.js');
const createError = require('../utils/errors/create-error.js');

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await Product.find();
        return res.status(200).json(allProducts);
    } catch (error) {
        next(error)
    }
});

productsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if(product) {
            return res.status(200).json(product);
        } else {
            next(createError("No existe un producto con ese id", 404));
        }
    } catch (err) {
        next(err);
    }
});

productsRouter.get('/name/:name', async (req, res, next) => {
    try {
        const nameProduct = req.params.name;
        const product = await Product.find({ name: nameProduct });
        if (product.length === 0) {
            return next(createError(`No hay ningún producto con ese nombre: ${nameProduct}`, 404))
        }
        return res.status(200).json(product);
    } catch (error) {
        next(error)
    }
});

productsRouter.post('/', async (req, res, next) => {
    try {
      const newProduct = new Product({ ...req.body });
      const createdProduct = await newProduct.save();
      return res.status(201).json(createdProduct);
  
    } catch (err) {
      next(err);
    }
  });

  productsRouter.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const modifiedProduct = new Product({ ...req.body });
        modifiedProduct._id = id;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            modifiedProduct,
            { new: true }
        );
        if (!updatedProduct) {
            return next(createError(`No se encuentra el producto con el Id: ${id} para actualizarlo`, 404))
        }
        return res.status(201).json(updatedProduct);
    } catch (error) {
        next(error)
    }
});

productsRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
       
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return next(createError(`No se encuentra el producto con el Id: ${id} para eliminarlo`, 404))
        } else {
            return res.status(200).json('Producto eliminado con éxito');
        }
    } catch (error) {
        next(error)
    }
});


module.exports = productsRouter;