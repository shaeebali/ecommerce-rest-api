# E-commerce REST API

This project is a RESTful API for an e-commerce platform built using Node.js and Express.

## Features

- **User Authentication**: Register and login users using JWT-based authentication.
- **Product Management**: CRUD operations for managing products.
- **Order Management**: Create and manage customer orders.
- **Middleware**: Request validation and authentication.
- **Error Handling**: Global error handling setup.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shaeebali/ecommerce-rest-api.git
   cd ecommerce-rest-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables in a `.env` file:
   ```bash
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Start the server:
   ```bash
   npm/pnpm run start
   ```

## API Endpoints

### User Routes
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login a user.

### Product Routes
- `GET /api/products`: Get all products.
- `POST /api/products`: Add a new product.

### Order Routes
- `GET /api/orders`: Get all orders.
- `POST /api/orders`: Create a new order.

## Technologies Used

- Node.js
- Express
- MongoDB
- JWT for authentication

## License

This project is licensed under the MIT License.
