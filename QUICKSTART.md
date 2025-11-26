# Quick Start Guide

## Backend Setup (5 minutes)

1. **Navigate to backend directory**
```bash
cd ogp-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

4. **Create admin user**
```bash
npm run seed:admin
```

5. **Start server**
```bash
npm run dev
```

✅ Backend running on `http://localhost:5000`

## Frontend Setup (3 minutes)

1. **Navigate to frontend directory**
```bash
cd ogp-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
# Edit if your backend URL is different
```

4. **Start application**
```bash
npm start
```

✅ Frontend running on `http://localhost:3000`

## First Login

Navigate to `http://localhost:3000` and login with:
- **Username**: `admin`
- **Password**: `admin123`

**⚠️ Change this password immediately after first login!**

## Testing the Setup

1. Open browser to `http://localhost:3000`
2. Login with admin credentials
3. You should see the dashboard
4. Check browser console for any errors
5. Check backend terminal for API logs

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists and has correct values
- Check port 5000 is not in use

### Frontend won't connect
- Verify backend is running
- Check `REACT_APP_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Login not working
- Verify admin user was created (`npm run seed:admin`)
- Check backend logs in `logs/` directory
- Verify JWT_SECRET is set in backend `.env`

## Next Steps

1. Change default admin password
2. Create additional users with different roles
3. Explore the API endpoints
4. Customize the frontend components
5. Add your business logic

## Support

Check the main README.md files in each repository for detailed documentation.