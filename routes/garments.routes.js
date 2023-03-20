const express = require('express');
const Garment = require('../models/Garments.js');

const garmentsRouter = express.Router();

garmentsRouter.get('/', async (req, res, next) => {
    try {
        const allGarments = await Garment.find();
        return res.status(200).json(allGarments);
    } catch (error) {
        next(error)
    }
});

garmentsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const garment = await Garment.findById(id);
        if(garment) {
            return res.status(200).json(garment);
        } else {
            next(createError("No existe ninguna prenda con ese id", 404));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = garmentsRouter;