Blog App (React + JWT Authentication)
Overview

This is a full-stack blog application built with React (frontend) and Node.js/Express (backend) using JWT authentication. Users can register and log in, create posts, view all posts, access their profile, and log out. The app uses Axios for HTTP requests and React Context to manage authentication state.

Table of Contents

Project Setup

Frontend Structure

Backend Structure

Authentication Flow

Using the App

Testing with Postman

Common Errors & Fixes

Next Steps

Project Setup
Prerequisites

Node.js and npm installed

Backend API running at http://localhost:5000/api

React app installed (npm install)

Running the App

Start backend server:

cd backend
npm install
npm start

Start frontend React app:

cd frontend
npm install
npm start

Open your browser: http://localhost:3000

Frontend Structure

src/pages → Page components: Login.js, Register.js, CreatePost.js, Home.js, Profile.js

src/services → API service files (authService.js, postService.js)

src/context/AuthContext.js → Stores logged-in user and token

src/App.js → Routing configuration

AuthContext Example
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
Backend Structure

routes/auth.js → Handles /register and /login endpoints

routes/posts.js → Handles /posts CRUD operations

middleware/auth.js → JWT token verification middleware

models/User.js and models/Post.js → MongoDB schemas

Authentication Flow

Register: POST /api/auth/register → Body: { name, email, password }

Login: POST /api/auth/login → Body: { email, password }

Frontend: Token saved in localStorage, Axios interceptor attaches token to all requests, AuthContext stores user info

Protected Routes: Only logged-in users can access /create-post or /profile

Using the App

Register: Go to /register, enter name, email, and password (email must be unique)

Login: Go to /login, enter email/password; on success, token is saved in localStorage

Create a Post: Go to /create-post, enter title and content; post is saved and visible on / (Home page)

View Profile: Go to /profile; shows logged-in user's name

Testing with Postman
Register a User

Method: POST

URL: http://localhost:5000/api/auth/register

Body (JSON):

{
  "name": "Khushi",
  "email": "khushi_test@gmail.com",
  "password": "123456"
}

Expected Response:

{
  "user": {
    "name": "Khushi",
    "email": "khushi_test@gmail.com",
    "_id": "some-id"
  },
  "token": "JWT_TOKEN_STRING"
}
Login

Method: POST

URL: http://localhost:5000/api/auth/login

Body (JSON):

{
  "email": "khushi_test@gmail.com",
  "password": "123456"
}

Expected Response:

{
  "user": {
    "name": "Khushi",
    "email": "khushi_test@gmail.com",
    "_id": "some-id"
  },
  "token": "JWT_TOKEN_STRING"
}
Create a Post

Method: POST

URL: http://localhost:5000/api/posts

Headers: Authorization: Bearer JWT_TOKEN_STRING, Content-Type: application/json

Body (JSON):

{
  "title": "My First Post",
  "content": "Hello world!"
}

Expected Response:

{
  "_id": "post-id",
  "title": "My First Post",
  "content": "Hello world!",
  "author": "user-id"
}
Common Errors & Fixes

401 Unauthorized: Token missing or invalid → Make sure user is logged in

400 Bad Request (Registration): Missing fields, password too short, or email already exists → Use unique email and provide all fields

Blank Profile Name: user.name not stored → Save full user object in context/localStorage