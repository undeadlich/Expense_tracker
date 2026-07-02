# Expense Tracker

A full-stack Expense Tracker built while learning **Java**, **Play Framework**, and **React**.

The project demonstrates building a REST API with Play Framework, implementing JWT authentication, integrating a MySQL database using Ebean ORM, and consuming the API from a React frontend.

## Tech Stack

### Backend
- Java 8
- Play Framework 2.6
- Ebean ORM
- MySQL
- JWT Authentication
- BCrypt Password Hashing

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Recharts
- React Hot Toast

---

## Running the Project

### Backend

Navigate to the backend folder:

```bash
cd Backend
```

Update the database configuration in:

```
conf/application.conf
```

Run the backend:

```bash
sbt run
```

The backend will start at:

```
http://localhost:9000
```

---

### Frontend

Navigate to the frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will start at:

```
http://localhost:5173
```

---

## Features

- User Signup & Login
- JWT Authentication
- Create, Edit & Delete Expenses
- Expense Item Breakdown
- Search, Sort & Filter Expenses
- Category-wise Expense Statistics
- Expense Details Page
- Responsive UI

---

## Notes

- Requires a MySQL database.
- Update `Backend/conf/application.conf` with your local database credentials before running the backend.
