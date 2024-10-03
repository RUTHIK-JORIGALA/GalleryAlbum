# GalleryAlbum

**GalleryAlbum** is a MERN stack application featuring user authentication and data fetching from an API. Users can create and manage their albums, and view galleries of photos. This project is built with **MongoDB**, **Express.js**, **React.js**, and **Node.js**.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)


## Features
- User authentication (register/login)
- Album management (create/view albums)
- Display photo galleries within albums
- Token-based authentication using JWT
- Protected routes for authenticated users only

## Technologies Used
- **Frontend**: React.js, Axios, React Router, React Toastify, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt
- **Build Tools**: Vite for frontend development
- **Development Tools**: ESLint, Nodemon

## Getting Started

### Prerequisites
Ensure you have the following installed on your local machine:
- **Node.js** (version 16+)
- **MongoDB** (local or cloud instance, such as MongoDB Atlas)
- **Git** for version control

### Installation

1. **Clone the repository**:
   
   git clone https://github.com/RUTHIK-JORIGALA/GalleryAlbum.git
   cd GalleryAlbum


2. **Backend setup**
    cd backend
    npm install
    node index.js / npm run dev

3. **Frontend setup**
    cd ../frontend
    npm install
    npm run dev
##
**Environment Variables**
In the backend/.env file, ensure you configure the following environment variables:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

MONGODB_URI: The connection string for your MongoDB instance (local or cloud).
JWT_SECRET: A secret key used to sign JWT tokens for authentication.

## Project Structure
**Frontend**
**src/pages**: Contains main pages like Login.js, Register.js, Albums.js, and PhotoGallery.js.
**src/components**: Contains reusable components like Layout.js and ProtectedRoute.js.
**src/App.js**: The main React component that manages routes and structure.

**Backend**
**index.js**: The entry point for the Express backend server.
**routes/**: Defines the API routes for user authentication and album management.
**models/**: Contains Mongoose models for users and albums.
**middlewares/**: Contains authentication and error-handling middleware.
