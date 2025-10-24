# PlanIt - Smart Planning Made Simple

A modern full-stack MERN application built with TypeScript for intelligent event and task management. PlanIt helps you organize your life with a clean, intuitive interface that makes planning effortless.

## Features

- **Modern UI Design** - Custom design system with smooth animations and beautiful gradients
- **Secure Authentication** - JWT-based login and signup with token authentication
- **Event Management** - Create, organize, and manage your events with ease
- **Task Management** - Break down events into actionable tasks and track progress
- **Real-time Updates** - Instant UI updates and progress tracking
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Smart Planning** - Intuitive interface designed for productivity

## Design System

PlanIt features a carefully crafted design system that creates a cohesive and pleasant user experience:

- **Primary Colors**: Blue gradients that convey trust and productivity
- **Secondary Colors**: Green gradients representing success and growth  
- **Accent Colors**: Yellow gradients for energy and focus
- **Typography**: Inter and Poppins fonts for modern readability
- **Animations**: Smooth transitions and floating elements
- **Glass Effects**: Modern backdrop blur and transparency effects

## Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast development and building
- **Tailwind CSS** with custom design system for styling
- **React Router** for seamless client-side navigation
- **React Hook Form** for efficient form management
- **React Hot Toast** for beautiful user notifications
- **Custom animations** and smooth transitions

### Backend
- **Node.js** with Express and TypeScript for robust server development
- **MongoDB** with Mongoose for reliable data persistence
- **JWT** for secure authentication and authorization
- **bcryptjs** for password security and hashing
- **Express Validator** for comprehensive input validation
- **CORS** for secure cross-origin request handling

## Getting Started

### Prerequisites
Before you begin, make sure you have the following installed:
- Node.js (version 16 or higher) - [Download from nodejs.org](https://nodejs.org/)
- MongoDB (local installation or MongoDB Atlas account)

### Installation



1. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `server` directory with the following content:
   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/planit-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

   Create a `.env` file in the `client` directory:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on your system. You can start it with:
   ```bash
   mongod
   ```

5. **Launch the application**

   Open two terminal windows. In the first terminal, start the backend server:
   ```bash
   cd server
   npm run dev
   ```

   In the second terminal, start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

6. **Access PlanIt**
   - Frontend application: http://localhost:3000
   - Backend API: http://localhost:5001

### Troubleshooting

**Common TypeScript Issues:**
- Ensure you've run `npm install` in both `client/` and `server/` directories
- The TypeScript configuration has been optimized to work with the installed dependencies
- If errors persist, try deleting `node_modules` and running `npm install` again

**Module Resolution Problems:**
- This usually indicates missing dependencies
- Run `npm install` in the respective directory
- Verify that Node.js and npm are properly installed on your system

**Port Conflicts:**
- If port 5000 is already in use, the application automatically uses port 5001
- Check that MongoDB is running on the default port (27017)
- Ensure no other applications are using the required ports

## Project Structure

The project is organized into two main directories for clear separation of concerns:

```
planit/
├── client/                    # React frontend application
│   ├── src/
│   │   ├── pages/            # Main page components
│   │   ├── components/       # Reusable UI components
│   │   ├── services/         # API communication layer
│   │   ├── types/            # TypeScript type definitions
│   │   ├── App.tsx           # Main application component
│   │   ├── main.tsx          # Application entry point
│   │   └── index.css         # Global styles and design system
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── vite.config.ts        # Vite build configuration
└── server/                   # Express backend application
    ├── src/
    │   ├── controllers/      # Request handling logic
    │   ├── middleware/      # Custom middleware functions
    │   ├── models/          # Database models and schemas
    │   ├── routes/          # API route definitions
    │   └── index.ts         # Server entry point
    └── package.json         # Backend dependencies
```

## API Reference

The PlanIt API provides a comprehensive set of endpoints for managing events and tasks. All protected routes require authentication via JWT tokens.

### Authentication Endpoints
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate user and receive access token

### Event Management
- `GET /api/events` - Retrieve all events for the authenticated user
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an existing event
- `DELETE /api/events/:id` - Remove an event

### Task Management
- `GET /api/tasks` - Retrieve all tasks for the authenticated user
- `POST /api/tasks` - Create a new task linked to an event
- `PUT /api/tasks/:id` - Update task details or status
- `DELETE /api/tasks/:id` - Remove a task

### Authentication
All protected endpoints require the `Authorization: Bearer <token>` header. Tokens are obtained through the login endpoint and should be included in subsequent requests.

## Development Notes

PlanIt is built with modern development practices and security considerations:

- **Authentication**: JWT tokens provide secure, stateless authentication
- **Authorization**: All protected routes require valid Bearer tokens
- **Security**: Passwords are securely hashed using bcryptjs
- **Validation**: Input validation is handled by express-validator
- **Routing**: React Router enables smooth client-side navigation
- **Styling**: Tailwind CSS provides utility-first styling with a custom design system
- **Type Safety**: TypeScript ensures type safety across the entire application

## Current Status - Fully Functional

PlanIt is now completely functional with all core features working seamlessly. The application provides a solid foundation for event and task management with a modern, intuitive interface.

### Working Features
- **User Authentication**: Complete registration and login system with JWT tokens
- **Event Management**: Full CRUD operations for creating, viewing, and managing events
- **Task Management**: Complete task lifecycle with status tracking and event linking
- **Event-Task Relationships**: Tasks are properly linked to their parent events
- **Real-time Updates**: All changes reflect immediately in the user interface
- **Error Handling**: Comprehensive error messages and input validation
- **Responsive Design**: Optimized for all screen sizes and devices
- **Modern UI**: Beautiful design with smooth animations and gradients

### Available Routes
- **`/`** - Home page featuring PlanIt branding and feature overview
- **`/login`** - Secure login page with elegant animations
- **`/signup`** - Registration page highlighting application benefits
- **`/dashboard`** - Main application interface for managing events and tasks

### Testing the Application

1. **Start the development servers:**
   ```bash
   # Terminal 1 - Backend server
   cd server && npm run dev
   
   # Terminal 2 - Frontend development server  
   cd client && npm run dev
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

3. **Experience the complete workflow:**
   - Visit http://localhost:3000 to see the PlanIt landing page
   - Click "Get Started" to create a new account
   - Or click "Sign In" and use the demo credentials: `test@example.com` / `123456`
   - Create events and tasks using the intuitive interface
   - Update task status with smooth animations
   - Delete items with confirmation dialogs


