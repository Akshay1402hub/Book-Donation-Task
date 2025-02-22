const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./mongodb/dbconnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = require('./userController/register');
const loginUser = require('./userController/login');


const User = require('./models/User');
const Book = require('./models/Book');

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(express.json());
app.use(cors()); // It is used to connect frontend and backend 


connectDB();

app.post('/api/users/register', registerUser);
app.post('/api/users/login', loginUser);



// Middleware Authentication 
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'User not Unauthorized' });
        }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err){ 
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Adding a Book  ( for Authenticated Users Only)
app.post('/api/books', auth, async (req, res) => {
    const { title, author, genre, year, ISBN, imageUrl } = req.body;
    const book = new Book({ title, author, genre, year, ISBN, imageUrl, addedBy: req.userId });
    await book.save();
    res.json({ message: 'Book added successfully' });
});

// Get all Books 
app.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Updating a book (for Authenticated Users Only)
app.put('/api/books/:id', auth, async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Book updated successfully' });
});
//Deleting a book
app.delete('/api/books/:id', auth, async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
