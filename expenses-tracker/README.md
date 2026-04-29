# Expense Tracker

A full-stack Daily Expense Tracker website built with Angular on the frontend and Node.js + Express + MongoDB on the backend.

## Project Structure

- `frontend/` - Angular application
- `backend/` - Node.js API and MongoDB models

## Setup

### Backend

1. Open terminal in `backend/`
2. Run `npm install`
3. Create `.env` from `.env.example`
4. Start backend with `npm run dev`

### Frontend

1. Open terminal in `frontend/`
2. Run `npm install`
3. Start frontend with `npm start`

## Running Locally

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Expenses
- `GET /api/expenses`
- `POST /api/expenses`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`
- `GET /api/expenses/monthly`
- `GET /api/expenses/category`

## Feature Overview

- Login and register with JWT authentication
- Create, edit, delete, search, and filter expenses
- Dashboard with daily/monthly totals and recent expenses
- Reports with monthly and category charts
- Settings with dark mode toggle and password update UI

## Notes

- Make sure MongoDB is running locally or update `MONGO_URI` to your hosted MongoDB cluster.
- The backend uses `bcryptjs` for password hashing and `jsonwebtoken` for authentication.
