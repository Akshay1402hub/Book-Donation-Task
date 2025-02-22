import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import '../styles/Home.scss';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/books');
                setBooks(res.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="home-container">
            <h1>Welcome to Book Donation</h1>
            <div className="book-list">
                {books.length > 0 ? (
                    books.map((book) => <BookCard key={book._id} book={book} />)
                ) : (
                    <p>No books available</p>
                )}
            </div>
        </div>
    );
};

export default Home;
