# digital-kitchen

A REST API for a food-ordering platform, built with Express and MongoDB. It covers authentication, a food catalog, a per-user cart, and order placement with role-based access control for regular users and admins.

## Tech stack

- **Runtime:** Node.js (ES modules)
- **Framework:** Express 5
- **Database:** MongoDB via Mongoose
- **Auth:** JWT (`jsonwebtoken`) + password hashing (`bcrypt`)
- **Validation:** Zod
- **Dev tooling:** nodemon

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB instance (local or hosted, e.g. MongoDB Atlas)

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital-kitchen
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

### Running the app

```bash
# development, with auto-restart
npm run dev

# production
npm start
```

The API is served under the `/api` prefix, e.g. `http://localhost:5000/api/food`.

## Project structure

```
src/
├── app.js              # Express app setup and middleware
├── server.js            # Entry point, DB connection + server start
├── config/               # Env and database configuration
├── controllers/          # Route handlers
├── middleware/            # Auth, authorization, validation, logging, error handling
├── models/                # Mongoose schemas (User, Food, Cart, Order)
├── routes/                 # Route definitions
├── services/               # Business logic
├── utils/                  # Shared helpers (JWT, async handler, app errors)
└── validators/              # Zod request-validation schemas
```

## API overview

All endpoints are prefixed with `/api`.

### Auth (`/api/auth`)

| Method | Endpoint    | Description         |
| ------ | ----------- | -------------------- |
| POST   | `/register` | Register a new user   |
| POST   | `/login`    | Log in and receive a JWT |

### Food (`/api/food`)

| Method | Endpoint     | Access | Description         |
| ------ | ------------ | ------ | -------------------- |
| GET    | `/`          | Public | List all food items   |
| GET    | `/:foodId`   | Public | Get a single food item |
| POST   | `/`          | Admin  | Create a food item     |
| PUT    | `/:foodId`   | Admin  | Update a food item     |
| DELETE | `/:foodId`   | Admin  | Delete a food item     |

### Cart (`/api/cart`)

Requires authentication (`user` or `admin`).

| Method | Endpoint    | Description        |
| ------ | ----------- | -------------------- |
| GET    | `/`         | View the current cart |
| POST   | `/`         | Add an item to the cart |
| DELETE | `/:foodId`  | Remove an item from the cart |
| DELETE | `/`         | Empty the cart        |

### Orders (`/api/order`)

Requires authentication (`user` or `admin`).

| Method | Endpoint | Description             |
| ------ | -------- | ------------------------ |
| POST   | `/`      | Place an order from the cart |
| GET    | `/`      | View order history         |
| GET    | `/:id`   | View a specific order       |
| DELETE | `/:id`   | Cancel an order              |

## License

ISC
