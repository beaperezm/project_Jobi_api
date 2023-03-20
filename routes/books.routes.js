const express = require('express');
const Book = require('../models/Books.js');

const booksRouter = express.Router();

booksRouter.get('/', async (req, res, next) => {
    try {
        const allBooks = await Book.find();
        return res.status(200).json(allBooks);
    } catch (error) {
        next(error)
    }
});

booksRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if(book) {
            return res.status(200).json(book);
        } else {
            next(createError("No existe ningún libro con ese id", 404));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = booksRouter;