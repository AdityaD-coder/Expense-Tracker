# ExpenseTrack

ExpenseTrack is a full-stack personal expense management application built with the MERN stack. It helps users track expenses, review spending trends, set monthly budgets, and manage personal finances in a clean dashboard.

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

## Screenshots

### Dashboard

Add a screenshot here.

### Expense List

Add a screenshot here.

### Analytics

Add a screenshot here.

## Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
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
   - Copy `.env.example` to `.env` in the server folder, or use the root `.env.example` as a reference.
   - Update the MongoDB URI and JWT secret.

   Example:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expensetrack
   JWT_SECRET=your_jwt_secret_here
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

## Future Improvements

- Export expenses to CSV
- Recurring expenses and subscriptions
- Dark mode
- Advanced reports and filters
- Email reminders and alerts

## Development Approach

1. Create the project structure.
2. Set up Express and MongoDB.
3. Create the User model and authentication APIs.
4. Create the Expense model and CRUD APIs.
5. Create the Budget model and APIs.
6. Set up React and Tailwind CSS v4.
7. Build authentication pages.
8. Build the dashboard.
9. Build expense management pages.
10. Build charts and analytics.
11. Build budget and profile pages.
12. Add responsive design, validation, and error handling.
13. Test the application.
14. Create README and env examples.
