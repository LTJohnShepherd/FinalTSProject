# University Registration System - Full Stack TypeScript Project

## Project Overview

A complete full-stack web application that provides a public landing page for prospective students to register their interest in a university program, along with an admin interface to manage and export registrant data.

## System Architecture

### Pages
- **Public Registration Page** (`/register`) - For prospective students to submit their information
- **Thank You Page** (`/thank-you`) - Confirmation after successful registration
- **Admin Login Page** (`/admin/login`) - Authentication for admin users; returns a JWT token which the client stores and presents on subsequent API requests
- **Admin Dashboard** (`/admin/dashboard`) - View all registrants and export to CSV
- **Login Page** (`/auth/login`) - User login; authenticates against stored student accounts and receives a JWT token
- **Dashboard Home** (`/dashboard`) - User dashboard

### Data Models

#### Interested Student
```typescript
{
  _id: ObjectId
  firstName: string
  lastName: string
  email: string
  password: string  // bcrypt-hashed password for login
  phone: string
  fieldOfInterest: string (enum from predefined list)
  registrationDate: Date
  registrationTime: Date
}
```

#### User Roles
Both students and admins share the same data model; the only difference is the `role` field, which is automatically set to `"student"` on registration. Admin accounts can be created directly in the database with `role: "admin"`.

Example user document:
```typescript
{
  _id: ObjectId
  firstName: string
  lastName: string
  email: string
  password: string  // bcrypt-hashed password for login
  phone: string
  fieldOfInterest: string (enum from predefined list)
  role: "student" | "admin"
  registrationDate: Date
  registrationTime: Date
}
```

### API Routes

#### Public Routes
- `POST /api/register` - Submit new student registration
- `POST /api/login` - Student authentication; returns JWT when credentials match database
- `POST /api/admin/login` - Admin authentication

#### Admin Protected Routes
- `GET /api/admin/students` - Get all registered students (requires auth)
- `GET /api/admin/export-csv` - Export students as CSV (requires auth)

## Technologies Used

### Frontend
- **React 19** - UI framework
- **TypeScript** - Strong typing
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Radix UI** - Component library
- **React Router 7** - Client-side routing
- **Axios** - HTTP client
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin support

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd FinalTSProject
```

2. **Setup Server**
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGO_DB=vite_web
```

3. **Setup Client**
```bash
cd ../client
npm install
```

## Running the Project

### Development Mode

**Terminal 1 - Start Server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:3000`

**Terminal 2 - Start Client:**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:3005`

### Building for Production

**Build Server:**
```bash
cd server
npm run build
npm start
```

**Build Client:**
```bash
cd client
npm run build
npm run preview
```

## Project Structure

```
FinalTSProject/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.tsx          # Public registration form
│   │   │   ├── ThankYou.tsx          # Success page
│   │   │   ├── Flags.tsx             # Placeholder page
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx         # Auth login
│   │   │   │   └── Register.tsx      # Auth register
│   │   │   └── dashboard/
│   │   │       └── Home.tsx          # Dashboard home
│   │   │   └── admin/
│   │   │       ├── AdminLogin.tsx    # Admin login form
│   │   │       └── AdminDashboard.tsx # Admin panel
│   │   ├── layouts/
│   │   │   ├── AuthLayout.tsx        # Auth page layout
│   │   │   └── DashboardLayout.tsx   # Dashboard layout
│   │   ├── router.tsx                # Route definitions
│   │   ├── App.tsx                   # Root component
│   │   ├── main.tsx                  # Entry point
│   │   └── style.css                 # Global styles
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts     # Auth logic
│   │   │   └── studentController.ts  # Student registration logic
│   │   ├── models/
│   │   │   ├── Student.ts            # Student type definition
│   │   ├── routes/
│   │   │   ├── studentRoutes.ts      # Student endpoints
│   │   │   └── adminRoutes.ts        # Admin endpoints
│   │   ├── db/
│   │   │   ├── mongoClient.ts        # MongoDB connection
│   │   │   └── mongoRepository.ts    # Database access
│   │   ├── config/
│   │   │   ├── env.ts                # Environment variables
│   │   │   └── baseUrl.ts            # API base path
│   │   ├── types/
│   │   │   ├── mongo.ts              # MongoDB collection types
│   │   │   └── user.ts               # User type
│   │   ├── utils/
│   │   │   └── csvExporter.ts        # CSV export functionality
│   │   └── app.ts                    # Express app setup
│   └── package.json
```

## Key Features

### Registration System
- Client-side form validation using Zod
- Real-time error messages
- Automatic date/time recording on backend
- Secure password hashing with bcrypt

### Admin Interface
- Email/password authentication (admin role required)
- Secure session management (JWT ready)
- View all registrant data in a table
- Export registrant data to CSV file

### TypeScript
- Full type safety across entire application
- No `any` types
- Proper interface definitions
- Type-safe API contracts

## Development Guidelines

### Code Organization
- Keep components small and focused
- Use TypeScript interfaces for all data structures
- Implement proper error handling
- Use descriptive naming conventions

### Commits
Use clear, descriptive commit messages:
```
feat: Add CSV export functionality
fix: Correct email validation regex
refactor: Reorganize server controllers
docs: Update README with setup instructions
```

## License

ISC

## Notes

- Database must be properly initialized before running
- CORS is configured for development (localhost:3005 to localhost:3000)
- All passwords are hashed with bcrypt (salt rounds: 10)
- CSV exports include all registrant fields with proper formatting
