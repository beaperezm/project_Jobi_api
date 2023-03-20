const express = require('express');
const Toy = require('../models/Toys.js');

const toysRouter = express.Router();

toysRouter.get('/', async (req, res, next) => {
    try {
        const allToys = await Toy.find();
        return res.status(200).json(allToys);
    } catch (error) {
        next(error)
    }
});

toysRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const toy = await Toy.findById(id);
        if(toy) {
            return res.status(200).json(toy);
        } else {
            next(createError("No existe ningún juguete con ese id", 404));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = toysRouter;