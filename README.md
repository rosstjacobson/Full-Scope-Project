# Task Manager Application #
- Simple full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js)
- Demonstrates the core CRUD operations (Create, Read, Update, and Delete) allowing users to manage tasks seamlessly by creating them, viewing them, checking them off, and deleting them
- React frontend interacts with RESTful API backend for easily integrating data sharing between database and user

# Project Structure #

- 'Back-End' —> Express server, MongoDB models, API routes
- 'frontend' —> React app

# Prerequisites #

- Node.js
- MongoDB running locally or a connection URI

# Setup Instructions #

Backend:
1. Navigate to backend folder: cd Back-End
2. Install dependencies: npm install
3. Start MongoDB if not running locally
4. Start server: node server.js

Frontend:
1. Navigate to frontend folder: cd frontend
2. Install dependencies: npm install
3. Update API URL in React code to change ports if neccessary
4. Start React app: npm start

# Usage #

- Server runs on 'http:localhost:5001'
- App runs on 'http:localhost:3000'
- As tasks are created and updated, they are saved to MongoDB
- When tasks are deleted, they are removed from MongoDB

