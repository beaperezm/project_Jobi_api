const express = require('express');
const Videogame = require('../models/Videogames.js');

const videogamesRouter = express.Router();

videogamesRouter.get('/', async (req, res, next) => {
    try {
        const allVideogames = await Videogame.find();
        return res.status(200).json(allVideogames );
    } catch (error) {
        next(error)
    }
});

videogamesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const videogame = await Videogame.findById(id);
        if(videogame) {
            return res.status(200).json(videogame);
        } else {
            next(createError("No existe ningún videojuego con ese id", 404));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = videogamesRouter;