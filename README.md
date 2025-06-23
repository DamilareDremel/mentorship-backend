# Mentorship Matching Platform API

A complete RESTful API backend for a mentorship matching platform, built with **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**. This backend handles user authentication, role-based access control, mentor discovery, mentorship requests, session booking, feedback, admin dashboard management, and mentor availability scheduling.

## Features

- Full Authentication & Authorization with JWT
- Role-based Access Control (Admin, Mentor, Mentee)
- User Profile creation and editing
- Mentor discovery with skill-based filtering
- Mentorship request workflow (send, accept, reject)
- Mentors set availability; Mentees book sessions
- Session feedback and automatic status updates
- Admin Dashboard:
  - View all users, sessions, requests
  - Assign mentors to mentees manually
  - Update user roles
- Clean RESTful API structure
- Secure password hashing with bcrypt
- Error handling and protected routes
- Environment variable configuration via `.env`

## API Endpoints Overview

| Method | Endpoint                           | Description                        |
| ------ | ---------------------------------- | ---------------------------------- |
| POST   | /api/auth/register                 | Register a new user                |
| POST   | /api/auth/login                    | Login a user and get JWT token     |
| POST   | /api/auth/reset-password           | Reset user password                |
| GET    | /api/users/me                      | Get current user's profile         |
| PUT    | /api/users/me/profile              | Update current user's profile      |
| GET    | /api/users/mentors                 | Get list of mentors (with filters) |
| POST   | /api/requests                      | Send mentorship request            |
| GET    | /api/requests/sent                 | View sent requests (mentee)        |
| GET    | /api/requests/received             | View received requests (mentor)    |
| PUT    | /api/requests/:id                  | Accept/Reject mentorship request   |
| POST   | /api/sessions                      | Book a session                     |
| GET    | /api/sessions/mentee               | View sessions (mentee)             |
| GET    | /api/sessions/mentor               | View sessions (mentor)             |
| PUT    | /api/sessions/:id/feedback         | Submit session feedback            |
| POST   | /api/availability                  | Add mentor availability block      |
| GET    | /api/availability/me               | View own availability              |
| GET    | /api/availability/:mentorId        | View a mentor's availability       |
| DELETE | /api/availability/:id              | Delete availability block          |
| GET    | /api/admin/users                   | View all users                     |
| PUT    | /api/admin/users/:id/role          | Update a user role                 |
| GET    | /api/admin/requests                | View all mentorship requests       |
| GET    | /api/admin/sessions                | View all sessions                  |
| POST   | /api/admin/assign-match            | Manually assign mentor to mentee   |

## Project Structure

mentorship-backend/
├── controllers/ # API logic handlers
├── migrations/ # Sequelize database migrations
├── models/ # Sequelize models
├── middleware/ # JWT & role verification middleware
├── routes/ # Express route definitions
├── .env # Environment variable settings
├── index.js # Application entry point
├── package.json # Project dependencies
└── README.md # Project documentation


## Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)
- PostgreSQL (v12+)

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd mentorship-backend

2. Install dependencies:
npm install

3. Configure your database settings in config/config.json and create a .env file in the root directory:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_secret_key

4. Run migrations:
npx sequelize-cli db:migrate

5. Start the development server:
npm run dev