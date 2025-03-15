# Prisma Activity 1

A simple demonstration of Prisma ORM with a MySQL database.

## Project Structure

- `prisma/schema.prisma`: Database schema with Account, Profile, and Module models
- `index.js`: Simple example of Prisma CRUD operations
- `.env`: Database connection string

## Models

1. **Account**: User account with UUID, email, username, password, and timestamps
   - Uses UUID as primary key instead of auto-incrementing integer
   - Includes createdAt and updateAt timestamps
   - Has one-to-one relation with Profile
   - Has one-to-many relation with Module

2. **Profile**: User profile with detailed information
   - Uses UUID as primary key
   - Includes firstname, middlename, lastname, suffix, bio, and picture
   - Has timestamps for creation and updates
   - Connected to Account with onDelete: Cascade

3. **Module**: Learning modules with detailed information
   - Uses UUID (recID) as primary key
   - Includes moduleCode, moduleDetails, and moduleDesc
   - Has timestamps for creation and updates
   - Connected to Account with onDelete: Cascade

## Functions Implemented

The `index.js` file contains these simple functions:

### Create Functions
- `createAccount()`: Creates a new account with a profile
- `createModule(accountId)`: Creates a module for an account

### Read Functions
- `getAccountById(id)`: Retrieves an account with its profile and modules

### Update Functions
- `updateAccount(id, email)`: Updates an account's email
- `updateProfile(userId, firstname)`: Updates a profile's first name

### Delete Functions
- `deleteAccountAndRelations(id)`: Deletes an account and all related data (uses cascade delete)

## How to Run

1. Make sure you have Node.js and MySQL installed
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your database connection in the `.env` file
4. Push the schema to the database:
   ```
   npx prisma db push
   ```
5. Run the application:
   ```
   node index.js
   ```

The application will create, read, update, and optionally delete data, showing the results in the console. 