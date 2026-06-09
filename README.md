# LearnHub

LearnHub is a full-stack Learning Management System (LMS) that allows instructors to create and manage courses while students can browse, purchase, and consume educational content through an intuitive learning platform.

## Features

### Student Features

- User registration and authentication
- Secure JWT-based login
- Browse all available courses
- View detailed course information
- Purchase courses using Stripe
- Access enrolled courses
- Video lesson player
- Learning dashboard
- User profile management

### Instructor Features

- Instructor dashboard
- Create and manage courses
- Organize content into modules
- Add and delete lessons
- Upload lesson video URLs
- Manage course curriculum
- View all created courses

### Platform Features

- Role-based access control
- JWT Authentication
- Stripe Payment Integration
- MongoDB Database
- Responsive Bootstrap UI
- RESTful API Architecture
- Protected Routes
- Course Enrollment System

---

## Tech Stack

### Frontend

- React
- React Router DOM
- Bootstrap 5
- Axios
- Stripe React SDK
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Stripe API
- CORS

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render

---

## Project Structure

```text
LearnHub
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   ├── config
│   └── package.json
│
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
NODE_ENV=production

PORT=3002

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3002

VITE_STRIPE_PUBLISH_KEY=your_stripe_publishable_key
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Future Improvements

- Course completion tracking
- Instructor analytics dashboard
- Progress persistence
- Course ratings and reviews
- Certificate generation
- Video upload support
- Quiz and assessment system
- AI-powered learning assistant
- Wishlist and bookmarks

---

## Author

Paritosh Singh

Electronics & Communication Engineering Student | Full Stack Developer

---

## License

This project is developed for educational and portfolio purposes.
