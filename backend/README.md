# Trek Planner Backend

Node.js/Express REST API for Trek Planner application.

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the server:
\`\`\`bash
npm run dev
\`\`\`

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login user

### Treks
- `GET /treks?page=X` - Get paginated list of treks
- `GET /treks/:id` - Get single trek
- `POST /treks` - Create new trek (requires JWT)
- `PUT /treks/:id` - Update trek (requires JWT)
- `DELETE /treks/:id` - Delete trek (requires JWT)

## Environment Variables

Create a `.env` file with:
\`\`\`
PORT=5000
JWT_SECRET=your-secret-key-here
\`\`\`

## Notes

- Currently using in-memory storage for demo purposes
- In production, replace with MongoDB using Mongoose
- JWT tokens expire in 7 days
