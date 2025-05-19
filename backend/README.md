# Backend Service

This is the backend service for the application.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB

### Installation

1. Clone the repository
2. Navigate to the backend directory:

```
cd backend
```

3. Install dependencies:

```
npm install
```

4. Create a `.env` file in the root directory and add required environment variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_jwt_secret
```

### Running the Application

Development mode:

```
node server.js
or
nodemon server.js
```

## API Documentation

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Users

- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

## Project Structure

```
backend/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
└── server.js       # Entry point
```

## Testing

Run tests:

```
npm test
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": {
    "message": "Error message here",
    "code": "ERROR_CODE"
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
