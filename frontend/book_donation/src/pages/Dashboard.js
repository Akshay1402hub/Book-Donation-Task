import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.scss';


const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [ISBN, setISBN] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [editId, setEditId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;

    useEffect(() => {
        getBooks();
    }, []);

    function getBooks() {
        axios.get("/api/books")
            .then(res => setBooks(res.data))
            .catch(err => console.log("Error:", err));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const bookData = { title, author, genre, year, ISBN, imageUrl };
        const token = localStorage.getItem("token");
        const headers = { Authorization: token };

        if (editId) {
            axios.put(`/api/books/${editId}`, bookData, { headers })
                .then(() => {
                    getBooks();
                    resetForm();
                })
                .catch(err => console.log("Edit error:", err));
        } else {
            axios.post("/api/books", bookData, { headers })
                .then(() => {
                    getBooks();
                    resetForm();
                })
                .catch(err => console.log("Add error:", err));
        }
    }

    function handleEdit(book) {
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setYear(book.year);
        setISBN(book.ISBN);
        setImageUrl(book.imageUrl);
        setEditId(book._id);
    }

    function handleDelete(id) {
        const token = localStorage.getItem("token");
        axios.delete(`/api/books/${id}`, { headers: { Authorization: token } })
            .then(() => getBooks())
            .catch(err => console.log("Delete error:", err));
    }

    function resetForm() {
        setTitle('');
        setAuthor('');
        setGenre('');
        setYear('');
        setISBN('');
        setImageUrl('');
        setEditId(null);
    }

    function exportAsJSON() {
        const jsonData = JSON.stringify(books, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'books.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div className="dashboard-container">
            <h2>Book Dashboard</h2>
            <form className="book-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
                <input type="text" placeholder="ISBN" value={ISBN} onChange={(e) => setISBN(e.target.value)} required />
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                <button type="submit">{editId ? 'Update Book' : 'Add Book'}</button>
            </form>

            <table className="book-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>ISBN</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((book, index) => (
                        <tr key={book._id}>
                            <td>{index + 1 + indexOfFirstBook}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.year}</td>
                            <td>{book.ISBN}</td>
                            <td><img src={book.imageUrl} alt="Book Cover" className="book-image" /></td>
                            <td style={{display:'flex'}}>
                                <button className="edit-btn" onClick={() => handleEdit(book)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(book._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
             
            <button className="export-btn" onClick={exportAsJSON}>Export as JSON</button>


            <div className="pagination">
                {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
