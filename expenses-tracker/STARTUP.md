# Quick Start Guide

## Prerequisites

- Node.js and npm installed
- MongoDB running locally (or update `MONGO_URI` in `backend/.env`)
- Two terminal windows

## Step 1: Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

## Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

Expected output:
- Angular dev server will open `http://localhost:4200` automatically
- Or navigate to `http://localhost:4200` manually

## Step 3: Test the Application

1. **Register**: Create a new account on the register page
2. **Login**: Use your credentials to log in
3. **Add Expense**: Create your first expense
4. **View Dashboard**: See your expense summaries
5. **Reports**: View charts and analytics
6. **Settings**: Toggle dark mode or manage preferences

## Backend API

The backend API runs on `http://localhost:5000/api`

Key endpoints:
- `POST /auth/register` - Create account
- `POST /auth/login` - Login (returns JWT token)
- `GET /expenses` - List all expenses
- `POST /expenses` - Create expense
- `PUT /expenses/:id` - Update expense
- `DELETE /expenses/:id` - Delete expense
- `GET /expenses/monthly` - Monthly summary
- `GET /expenses/category` - Category breakdown

All expense endpoints require JWT token (auto-added via interceptor).

## MongoDB Setup

If you don't have MongoDB running locally:

### Option 1: Local Installation
Download and install MongoDB Community Edition from mongodb.com

### Option 2: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### Option 3: MongoDB Atlas
1. Create account at mongodb.com/cloud
2. Create cluster
3. Update `MONGO_URI` in `backend/.env` with connection string

## Troubleshooting

### Port 5000 already in use
Change `PORT` in `backend/.env`

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check `environment.ts` has `apiUrl: 'http://localhost:5000/api'`

### MongoDB connection failed
- Start MongoDB service
- Or update `MONGO_URI` in `.env`

## Project Structure

```
expense-tracker/
├── frontend/             # Angular app
│   ├── src/
│   ├── package.json
│   └── angular.json
├── backend/              # Express API
│   ├── src/
│   │   ├── server.js     # Main entry
│   │   ├── config/       # DB config
│   │   ├── models/       # Mongoose schemas
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, errors
│   │   └── utils/        # Helpers
│   ├── package.json
│   └── .env              # Environment config
└── README.md
```

## Production Deployment

### Frontend Build
```bash
cd frontend
ng build --configuration production
# Output in dist/frontend
```

### Backend Deployment
1. Set `NODE_ENV=production` in `.env`
2. Use process manager (PM2, etc.)
3. Deploy to Heroku, AWS, DigitalOcean, etc.

## Support

For issues or questions, check:
- Backend logs in terminal
- Browser console (F12)
- Network tab to debug API calls
