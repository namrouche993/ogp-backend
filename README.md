# OGP Backend API

Operations Management Backend API built with Express.js, MongoDB, and JWT authentication.

## Features

- ✅ JWT Authentication
- ✅ Role-based Access Control (Admin, Manager, Operator, Viewer)
- ✅ Rate Limiting
- ✅ Winston Logging with Daily Rotation
- ✅ MongoDB Integration
- ✅ Security Best Practices (Helmet, CORS, Sanitization)
- ✅ Error Handling
- ✅ GitHub Actions CI/CD

## Prerequisites

- Node.js >= 18.x
- MongoDB >= 5.x
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/namrouche993/ogp-backend
cd ogp-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Edit `.env` with your configuration
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_minimum_32_characters
```

5. Create initial admin user
```bash
npm run seed:admin
```

Default credentials:
- Username: `admin`
- Password: `admin123`

**⚠️ Change the default password immediately!**

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login (public)
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/users` - Create user (admin only)

## Project Structure
```
ogp-backend/
├── src/
│   ├── config/          # Configuration files (DB, Logger, Rate Limiter)
│   ├── middleware/      # Express middleware (Auth, Error Handler)
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── scripts/         # Utility scripts
│   └── app.js           # Express app setup
├── logs/                # Application logs (auto-generated)
├── .env                 # Environment variables
├── server.js            # Server entry point
└── package.json
```

## Logging

Logs are stored in the `logs/` directory:
- `error-YYYY-MM-DD.log` - Error logs only
- `combined-YYYY-MM-DD.log` - All logs
- `exceptions-YYYY-MM-DD.log` - Unhandled exceptions
- `rejections-YYYY-MM-DD.log` - Unhandled promise rejections

Logs rotate daily and are kept for 14 days.

## User Roles

- **admin**: Full access to all resources
- **manager**: Access to operational features
- **operator**: Limited operational access
- **viewer**: Read-only access

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on all API endpoints
- Stricter rate limiting on auth endpoints
- MongoDB injection prevention
- XSS protection with Helmet
- HPP (HTTP Parameter Pollution) protection
- CORS configuration

## Testing
```bash
npm test
```

## Linting
```bash
npm run lint
```

## License

Private - SONATRACH OGP