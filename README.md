# MERN Stack Task Manager

A full-stack task management application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Task Management**: Create, read, update, delete, and toggle completion status of tasks
- **Task Filtering**: Filter tasks by completion status (all, pending, completed)
- **Task Prioritization**: Set task priority (low, medium, high)
- **Dashboard**: Overview of task statistics and recent tasks
- **Profile Management**: Update user profile information
- **Responsive Design**: Modern, mobile-friendly UI

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React.js**: JavaScript library for building user interfaces
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Context API**: State management
- **CSS3**: Modern styling with gradients and animations

## Project Structure

```
mern-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── common/     # Reusable components
│   │   │   ├── dashboard/  # Dashboard components
│   │   │   ├── layout/     # Layout components
│   │   │   ├── profile/    # Profile components
│   │   │   └── tasks/      # Task management components
│   │   ├── context/        # React Context providers
│   │   └── services/       # API services
├── middleware/             # Express middleware
├── models/                 # Mongoose models
├── routes/                 # Express routes
├── .env                    # Environment variables
├── package.json            # Backend dependencies
└── server.js              # Express server entry point
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mernapp
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   PORT=5000
   ```

3. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

### Frontend Setup

1. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Configure API URL** (optional):
   Create a `.env` file in the `client` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

### Development Mode

1. **Start the backend server:**
   ```bash
   npm run server
   ```
   The server will run on http://localhost:5000

2. **Start the React frontend:**
   ```bash
   npm run client
   ```
   The client will run on http://localhost:3000

3. **Run both concurrently:**
   ```bash
   npm run dev
   ```

### Production Mode

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String,
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  user: ObjectId (ref: User),
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes and middleware
- Input validation
- CORS configuration
- Environment variable protection

## Deployment

### Heroku Deployment

1. **Create a Heroku app:**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NODE_ENV=production
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Add database user and whitelist IP addresses
4. Get connection string and update `MONGODB_URI` in environment variables

## Scripts

- `npm start` - Start production server
- `npm run server` - Start development server with nodemon
- `npm run client` - Start React development server
- `npm run dev` - Run both backend and frontend concurrently
- `npm run build` - Build React app for production

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [your-email@example.com].

---

**Happy coding!** 🚀
