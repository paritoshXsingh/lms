# LearnHub

LearnHub is a full-stack Learning Management System (LMS) built using the MERN stack. The platform enables students to discover, purchase, and consume online courses while allowing instructors to create and manage educational content through a dedicated dashboard.

## Live Demo

Frontend: https://lms-mu-hazel.vercel.app

Backend API: https://lms-4cho.onrender.com

## Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control
* Student and Instructor roles
* Protected routes

### Student Features

* Browse courses by category
* View course curriculum
* Secure Stripe-powered checkout
* Course enrollment
* Personalized learning dashboard
* Video lesson player

### Instructor Features

* Create and manage courses
* Add and delete modules
* Add and delete lessons
* Organize course curriculum
* Manage educational content

### Payments

* Stripe payment integration
* Secure checkout workflow
* Automatic enrollment after successful payment

### Deployment

* Frontend hosted on Vercel
* Backend hosted on Render
* MongoDB Atlas database

## Tech Stack

### Frontend

* React
* React Router
* Bootstrap 5
* Axios
* Vite
* Stripe React SDK

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* Stripe API

## Database Design

The platform follows a hierarchical structure:

Course → Modules → Lessons

Users can enroll in courses and access lesson content through the learning dashboard.

## Future Improvements

* Become Instructor workflow
* Course reviews and ratings
* Progress tracking
* Certificates
* Quiz system
* AI-powered learning assistant

## Author

Paritosh Singh

Full Stack Developer | MERN Stack | ECE Undergraduate
