# Prisma Activity 1

A simple demonstration of Prisma ORM with a MySQL database.

## Project Structure

- `prisma/schema.prisma`: Database schema with Account, Profile, and Module models
- `index.js`: Simple example of Prisma CRUD operations
- `.env`: Database connection string

## Models

1. **Account**: User account with email and password
2. **Profile**: User profile information with one-to-one relationship to Account
3. **Module**: Learning modules with many-to-one relationship to Account

## Functions Implemented

The `index.js` file contains these simple functions:

### Create Functions
- `createAccount()`: Creates a new account with a profile
- `createModule(accountId)`: Creates a module for an account

### Read Functions
- `getAccountById(id)`: Retrieves an account with its profile and modules

### Update Functions
- `updateAccount(id, email)`: Updates an account's email
- `updateProfile(accountId, firstName)`: Updates a profile's first name

### Delete Functions
- `deleteAccountAndRelations(id)`: Deletes an account and all related data

## How to Run

1. Make sure you have Node.js and MySQL installed
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your database connection in the `.env` file
4. Run the Prisma migrations:
   ```
   npx prisma migrate dev
   ```
5. Run the application:
   ```
   node index.js
   ```

The application will create, read, update, and optionally delete data, showing the results in the console. 