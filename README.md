# Project DISCRIPTION :-

# Book Donation Application

## Overview
The **Book Donation Application** is a web-based platform that allows users to add, edit, view, and delete book records. The application provides an authenticated interface for registered users to manage book donations while offering a visually appealing card-based view for unauthenticated users.

The project is built using **MERN Stack** (MongoDB, Express.js, React.js, and Node.js) and deployed on [Render] https://book-donation-task.onrender.com.

## Features
- **User Authentication:** Only authenticated users can add, edit, and delete book records.
- **Book Management:** Users can add books with details such as title, author, genre, publication year, ISBN, and an image URL.
- **Card View for Unauthenticated Users:** Books are displayed in a card-based format on the Home Page for better visual.
- **Export Data:** Allows exporting of book records in JSON format.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile views.

## Backend Implementation
The backend is built using **Node.js** and **Express.js** with a **MongoDB database**.
---
# Dependencies used and The reason for useing it:-
 1.bcryptjs :- bcryptjs is used for password hashing ,security and Password Verification.
 2.Cors :- It allow's the frontend to communicate with the backend from a different origin.
 3.dotenv:- It loads environment variables from a .env file to keep sensitive data secure.
 4.express:- It is a Web framework for Node.js, used to create API routes and handle HTTP requests.
 5.jsonwebtoken:- It Implements authentication by generating and verifying JWT tokens for user sessions.
 6.mongoose: It is a library for MongoDB, providing easy interaction with the database.

## Installation
### Prerequisites
- Node.js and npm installed
- MongoDB database setup

### Steps to Run Locally

1. **Backend Setup:**
   ```sh
   cd backend
   npm install
   ```
   - Create a `.env` file and configure it as follows:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PORT=5000
     ```
   - Start the backend server:
     ```sh
     npm start
     npm run dev
     ```

2. **Visit:**
   ```
   http://localhost:3000
   ```
   to access the application.

---

## Deployment
- The application is deployed on **Render.com**.
---

## Contact
For any issues or suggestions, feel free to reach out!
akshaysaini1402@gmail.com
8920744420
---

**Developed by:** Akshay Saini