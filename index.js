const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create functions
async function createAccount() {
  const account = await prisma.account.create({
    data: {
      email: `user-${Date.now()}@example.com`,
      username: `user${Date.now()}`,
      password: "password123",
      profile: {
        create: {
          firstname: "John",
          middlename: "Robert",
          lastname: "Doe",
          suffix: "Jr.",
          bio: "A sample user profile"
        }
      }
    },
    include: { profile: true }
  });
  
  console.log("Created account:", account);
  return account;
}

async function createModule(accountId) {
  const module = await prisma.module.create({
    data: {
      accountCode: accountId,
      moduleCode: "MOD-001",
      moduleDetails: "Introduction to Prisma ORM",
      moduleDesc: "Learn the basics of Prisma ORM with practical examples"
    }
  });
  
  console.log("Created module:", module);
  return module;
}

// Read functions
async function getAccountById(id) {
  const account = await prisma.account.findUnique({
    where: { id },
    include: {
      profile: true,
      modules: true
    }
  });
  
  console.log("Account found:", account);
  return account;
}

// Update functions
async function updateAccount(id, email) {
  const account = await prisma.account.update({
    where: { id },
    data: { email },
    include: { profile: true }
  });
  
  console.log("Updated account:", account);
  return account;
}

async function updateProfile(userId, firstname) {
  const profile = await prisma.profile.update({
    where: { userId },
    data: { firstname }
  });
  
  console.log("Updated profile:", profile);
  return profile;
}

// Delete functions
async function deleteAccountAndRelations(id) {
  // With onDelete: Cascade, deleting the account will automatically delete related records
  const account = await prisma.account.delete({
    where: { id }
  });
  
  console.log("Deleted account and related data:", account);
  return account;
}

// Main function
async function main() {
  try {
    // Create data
    console.log("\n--- CREATING DATA ---");
    const account = await createAccount();
    await createModule(account.id);
    
    // Read data
    console.log("\n--- READING DATA ---");
    await getAccountById(account.id);
    
    // Update data
    console.log("\n--- UPDATING DATA ---");
    await updateAccount(account.id, `updated-${Date.now()}@example.com`);
    await updateProfile(account.id, "Jane");
    
    // Delete data (commented out by default)
    console.log("\n--- DELETING DATA ---");
    // Uncomment the line below to test deletion
    // await deleteAccountAndRelations(account.id);
    
    console.log("\nAll operations completed successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the main function
main(); 