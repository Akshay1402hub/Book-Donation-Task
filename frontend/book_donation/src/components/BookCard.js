import React from 'react';
import '../components/bookcard.scss';

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <img src={book.imageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Year:</strong> {book.year}</p>
        </div>
    );
};

export default BookCard;
