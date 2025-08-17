# Authentication Backend

A complete authentication system built with Node.js, Express, and MongoDB.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- Rate limiting
- Security headers
- CORS support
- Error handling

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/auth_db
# or for MongoDB Atlas: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Secret Key (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/auth_db`

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your values

### 4. Generate JWT Secret

Generate a strong random string for JWT_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 5. Run the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### 1. Sign Up
- **URL:** `POST /api/auth/signup`
- **Description:** Register a new user
- **Body:**
     ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "Password123",
     "confirmPassword": "Password123"
   }
   ```
  - **Response:**
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "data": {
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  }
  ```

#### 2. Sign In
- **URL:** `POST /api/auth/signin`
- **Description:** Login existing user
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- **Response:** Same as signup response

#### 3. Get Current User
- **URL:** `GET /api/auth/me`
- **Description:** Get current user's profile
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  }
  ```

#### 4. Update Profile
- **URL:** `PUT /api/auth/update-profile`
- **Description:** Update user's name
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "John Smith"
  }
  ```

#### 5. Change Password
- **URL:** `PUT /api/auth/change-password`
- **Description:** Change user's password
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "currentPassword": "Password123",
    "newPassword": "NewPassword123"
  }
  ```

### Utility Routes

#### Health Check
- **URL:** `GET /api/health`
- **Description:** Check if server is running
- **Response:**
  ```json
  {
    "success": true,
    "message": "Server is running",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

## Frontend Integration

### Setting up API calls

```javascript
// Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Example signup
const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token
      localStorage.setItem('token', data.token);
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Example protected request
const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};
```

## Security Features

- **Password Hashing:** Passwords are hashed using bcrypt with salt rounds of 12
- **JWT Tokens:** Secure token-based authentication
- **Input Validation:** Comprehensive validation for all inputs
- **Rate Limiting:** Prevents brute force attacks
- **Security Headers:** Helmet.js for security headers
- **CORS:** Configurable CORS for frontend integration

## Validation Rules

### Signup Validation
- **Name:** 2-50 characters, letters and spaces only
- **Email:** Valid email format, unique
- **Password:** Minimum 6 characters, must contain uppercase, lowercase, and number
- **Confirm Password:** Must match password

### Signin Validation
- **Email:** Valid email format
- **Password:** Required

## Development

### Project Structure
```
backend/
├── config/
│   └── database.js
├── controllers/
│   └── authController.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── utils/
│   └── authUtils.js
├── package.json
├── server.js
└── README.md
```

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not implemented yet)

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in .env file
   - Ensure network access if using MongoDB Atlas

2. **JWT Secret Error**
   - Generate a new JWT secret
   - Ensure it's at least 32 characters long

3. **CORS Error**
   - Update CORS origin in server.js to match your frontend URL
   - Check if frontend is running on the correct port

4. **Validation Errors**
   - Check the validation rules above
   - Ensure all required fields are provided
   - Verify password requirements

## Support

For issues or questions, please check the error logs and ensure all environment variables are properly set.
