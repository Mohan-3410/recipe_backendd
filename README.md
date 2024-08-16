
## Backend - Recipe Finder API

### Overview

This is the backend API for the Recipe Finder project. It is built using Node.js and Express.js with MongoDB as the database. The API provides endpoints for user authentication, recipe management, and favorite recipes.

### Tech Stack

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and recipes.
- **Mongoose**: ODM for MongoDB to manage database interactions.
- **Passport.js**: Middleware for authentication, including Google OAuth 2.0.
- **JWT**: JSON Web Tokens for securing API endpoints.

### Features

- **User Authentication**: Supports both Google OAuth 2.0 and email/password login.
- **Recipe Management**: CRUD operations for recipes.
- **Favorites Management**: API endpoints to manage favorite recipes.
- **JWT Authentication**: Secures API endpoints with JWT tokens.
- **Session Management**: Manages user sessions with secure cookies.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/recipe-finder-backend.git
   cd recipe-finder-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:

   Create a `.env` file in the root directory and add the following:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/recipe-finder
   PORT=5000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ACCESS_TOKEN_PRIVATE_KEY=your-access-token-private-key
   REFRESH_TOKEN_PRIVATE_KEY=your-refresh-token-private-key
   ```

4. **Run the application**:

   ```bash
   npm start
   ```

   The API will be running at `http://localhost:5000`.

### Folder Structure

- **`/controllers`**: Business logic for handling requests.
- **`/models`**: Mongoose models for MongoDB collections.
- **`/routes`**: Express routes for API endpoints.
- **`/middleware`**: Custom middleware for authentication and error handling.
- **`/config`**: Configuration files for Passport.js and other services.

### API Endpoints

- **User Authentication**:
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Login with email and password.
  - `GET /auth/google`: Google OAuth login.
  - `GET /auth/google/callback`: Google OAuth callback.
  - `POST /api/auth/refresh-token`: Refresh the access token.
  - `POST /api/auth/logout`: Logout the user.

- **Recipe Management**:
  - `GET /api/recipes`: Get all recipes.
  - `POST /api/recipes`: Create a new recipe.
  - `GET /api/recipes/:id`: Get a recipe by ID.
  - `PUT /api/recipes/:id`: Update a recipe by ID.
  - `DELETE /api/recipes/:id`: Delete a recipe by ID.

- **Favorites Management**:
  - `POST /api/favorites`: Add a recipe to favorites.
  - `DELETE /api/favorites/:id`: Remove a recipe from favorites.

### Usage

- **Authentication**: Use Google OAuth or email/password to authenticate users.
- **CRUD Operations**: Perform CRUD operations on recipes.
- **Favorites**: Manage users' favorite recipes.

### Deployment

To deploy the backend API:

1. **Ensure MongoDB is set up** on your production server.
2. **Set up environment variables** on the production server.
3. **Start the server**:

   ```bash
   npm start
   ```

### Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

### License

This project is licensed under the MIT License.

---

### Additional Notes

- **Testing**: You may want to add sections for testing the application using tools like Jest or Mocha.
- **CI/CD**: If you set up CI/CD pipelines, include instructions for that as well.
- **API Documentation**: Consider using tools like Swagger to generate and include API documentation.

This `README.md` provides a comprehensive guide for setting up, running, and contributing to both the frontend and backend parts of the project. It also outlines the necessary environment variables, folder structure, and available API endpoints.
