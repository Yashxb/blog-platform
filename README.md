📝 Blog Platform — MERN Stack

A full-stack Blog Platform built using the MERN stack (MongoDB, Express, React, Node.js) that enables users to register, authenticate, and create/manage blog posts through a modern responsive interface.

🚀 Live Features

🔐 User Authentication (JWT based login/register)

✍️ Create, Edit & Delete Posts

📖 View All Blogs & Single Post Pages

🔒 Protected Routes for Authenticated Users

🧠 Persistent Login using Local Storage

🎨 Responsive UI with reusable components

⚡ RESTful API with Express & MongoDB

🧰 Tech Stack
Frontend

⚛️ React.js

🔀 React Router DOM

🌐 Axios

🧠 Context API (Auth State)

Backend

🟢 Node.js

🚀 Express.js

🍃 MongoDB + Mongoose

🔐 JWT Authentication

🔒 bcryptjs for password hashing

📁 Project Structure

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/blog-platform.git
cd blog-platform
2️⃣ Backend Setup
cd server
npm install

Create a .env file in the server/ directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server:

npm start
3️⃣ Frontend Setup

Open a new terminal:

cd client
npm install
npm start
🌐 Application URLs
Service	URL
Frontend	http://localhost:3000

Backend	http://localhost:5000
🔐 Authentication Flow

User registers or logs in

Server returns a JWT token

Token is stored in localStorage

Protected routes validate the user using Context API

📌 API Overview
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/posts	Get all posts
POST	/api/posts	Create post
PUT	/api/posts/:id	Update post
DELETE	/api/posts/:id	Delete post
🎯 Future Enhancements

👍 Like & Comment system

🔎 Search & filter posts

👤 User profile pages

📸 Image upload for posts

🌍 Deployment (Vercel + Render + MongoDB Atlas)

🧪 Testing

Basic manual testing performed using browser and API routes.

🤝 Contributing

Contributions are welcome!
Feel free to fork this repository and submit a pull request.

👨‍💻 Author
Yash Raj Bhasin

⭐ Acknowledgement

This project was built as part of a full-stack MERN learning journey.
