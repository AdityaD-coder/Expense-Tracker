# ExpenseTrack

ExpenseTrack is a full-stack personal expense management application built with the MERN stack. It helps users track expenses, review spending trends, set monthly budgets, and manage personal finances in a clean and simple dashboard.

## Features

- User registration and login with JWT authentication
- Password hashing with bcryptjs
- Protected dashboard and routes
- Add, edit, view, delete, and filter expenses
- Expense summary cards for total, monthly, and daily spending
- Category-wise breakdown and monthly charts using Recharts
- Simple monthly budget tracking with progress bar
- Profile page to update the displayed name
- Responsive layout for desktop, tablet, and mobile screens
- Dark Mode Toggle Theme

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- Tailwind CSS v4
- JWT
- Mongoose
- Axios
- Recharts

## Installation

1. Clone the repository
   ```bash
   git clone <my-repo-url>
   cd ExpenseTrack
   ```

2. Install backend dependencies
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Configure environment variables
   - Put the MongoDB URI and JWT secret in '.env' file

   Example:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expensetrack
   JWT_SECRET=
   ```

5. Start the backend server
   ```bash
   cd ../server
   npm run dev
   ```

6. Start the frontend server
   ```bash
   cd ../client
   npm run dev
   ```

7. Open the app in the browser
   ```text
   http://localhost:5173
   ```

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- PUT /api/auth/me

### Expenses

- GET /api/expenses
- GET /api/expenses/:id
- POST /api/expenses
- PUT /api/expenses/:id
- DELETE /api/expenses/:id
- GET /api/expenses/summary

### Budget

- GET /api/budget
- POST /api/budget
- PUT /api/budget