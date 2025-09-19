# Node.js CRUD API with MongoDB

A complete Node.js CRUD (Create, Read, Update, Delete) API boilerplate using Express.js and MongoDB with Mongoose ODM for managing lead/user data.

## Features

- ✅ Complete CRUD operations
- ✅ MongoDB with Mongoose ODM
- ✅ Input validation using express-validator
- ✅ Error handling middleware
- ✅ Security middleware (Helmet, CORS)
- ✅ Request logging (Morgan)
- ✅ Environment configuration
- ✅ Soft delete functionality
- ✅ Lead management features
- ✅ Company size filtering
- ✅ Lead source filtering
- ✅ Clean project structure

## Project Structure

```
db_mongo/
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   └── userController.js    # User/Lead CRUD operations
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   └── notFound.js          # 404 error handling
├── models/
│   └── User.js              # User/Lead Mongoose model
├── routes/
│   └── users.js             # User/Lead routes with validation
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md               # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/crud_app
   NODE_ENV=development
   ```

4. Make sure MongoDB is running on your system

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Users/Leads

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/users` | Get all users/leads | - |
| GET | `/users/:id` | Get user/lead by ID | - |
| POST | `/users` | Create new user/lead | See field requirements below |
| PUT | `/users/:id` | Update user/lead | See field requirements below |
| DELETE | `/users/:id` | Soft delete user/lead | - |
| GET | `/users/leads/:source` | Get users by lead source | - |
| GET | `/users/companies/:size` | Get users by company size | - |

### Field Requirements

#### Required Fields
- **first_name**: String, max 50 characters
- **last_name**: String, max 50 characters  
- **email**: Valid email format, unique
- **company_name**: String, max 100 characters
- **company_size**: String, max 50 characters
- **lead_source**: One of: `website`, `social_media`, `referral`, `advertisement`, `cold_call`, `email_campaign`, `event`, `other`

#### Optional Fields
- **website**: Valid URL (must start with http:// or https://)

### Example Requests

#### Create User/Lead
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "company_name": "Acme Corp",
    "company_size": "51-200 employees",
    "website": "https://acme.com",
    "lead_source": "website"
  }'
```

#### Get All Users/Leads
```bash
curl http://localhost:3000/api/users
```

#### Get User/Lead by ID
```bash
curl http://localhost:3000/api/users/USER_ID
```

#### Update User/Lead
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Smith",
    "email": "johnsmith@example.com",
    "company_name": "Acme Corporation",
    "company_size": "201-500 employees",
    "website": "https://acme-corp.com",
    "lead_source": "referral"
  }'
```

#### Get Users by Lead Source
```bash
curl http://localhost:3000/api/users/leads/website
```

#### Get Users by Company Size
```bash
curl http://localhost:3000/api/users/companies/51-200%20employees
```

#### Delete User/Lead
```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID
```

## Response Format

All responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { 
    "first_name": "John",
    "last_name": "Doe",
    "full_name": "John Doe",
    "email": "john@example.com",
    "company_name": "Acme Corp",
    "company_size": "51-200 employees",
    "website": "https://acme.com",
    "lead_source": "website",
    "isActive": true,
    "createdAt": "2023-...",
    "updatedAt": "2023-..."
  },
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

## Data Model

### User/Lead Schema
- **first_name**: Required, max 50 characters
- **last_name**: Required, max 50 characters
- **email**: Required, valid email format, unique
- **company_name**: Required, max 100 characters
- **company_size**: Required, string, max 50 characters
- **website**: Optional, valid URL format
- **lead_source**: Required, enum values (website, social_media, referral, advertisement, cold_call, email_campaign, event, other)
- **isActive**: Boolean, defaults to true
- **createdAt**: Auto-generated timestamp
- **updatedAt**: Auto-generated timestamp
- **full_name**: Virtual field combining first_name and last_name

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/crud_app |
| NODE_ENV | Environment | development |

## Database

This project uses MongoDB with Mongoose ODM. The User model includes:
- Automatic timestamps (createdAt, updatedAt)
- Input validation
- Soft delete functionality
- Email uniqueness constraint
- Virtual fields for computed values

## Error Handling

The API includes comprehensive error handling:
- Validation errors
- Database errors
- 404 Not Found
- 500 Server errors
- Duplicate key errors

## Security Features

- Helmet.js for security headers
- CORS enabled
- Input validation and sanitization
- Error message sanitization

## Development

### Adding New Models

1. Create a new model in `models/` directory
2. Create controller in `controllers/` directory
3. Create routes in `routes/` directory
4. Add validation rules
5. Update server.js to include new routes

### Adding Middleware

Add custom middleware in the `middleware/` directory and import in `server.js`.

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions, please create an issue in the repository.
