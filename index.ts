const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAccount() {
  try {
    const account = await prisma.account.create({
      data: {
        email: `user-${Date.now()}@example.com`,
        password: "password123",
        profile: {
          create: {
            firstName: "John",
            lastName: "Doe",
          },
        },
      },
      include: { profile: true },
    });

    console.log("Created account:", account);
    return account;
  } catch (error) {
    console.error("Error creating account:", error.message);
  }
}

async function createModule(accountId) {
  try {
    const accountExists = await prisma.account.findUnique({
      where: { id: accountId },
    });
    if (!accountExists) throw new Error("Account does not exist");

    const module = await prisma.module.create({
      data: {
        title: "Getting Started with Prisma",
        accountId: accountId,
      },
    });

    console.log("Created module:", module);
    return module;
  } catch (error) {
    console.error("Error creating module:", error.message);
  }
}

async function getAccountById(id) {
  try {
    const account = await prisma.account.findUnique({
      where: { id },
      include: {
        profile: true,
        modules: true,
      },
    });

    if (!account) {
      console.log("Account not found");
      return null;
    }

    console.log("Account found:", account);
    return account;
  } catch (error) {
    console.error("Error fetching account:", error.message);
  }
}

async function updateAccount(id, email) {
  try {
    const emailExists = await prisma.account.findUnique({ where: { email } });
    if (emailExists && emailExists.id !== id) {
      throw new Error("Email already in use");
    }

    const account = await prisma.account.update({
      where: { id },
      data: { email },
      include: { profile: true },
    });

    console.log("Updated account:", account);
    return account;
  } catch (error) {
    console.error("Error updating account:", error.message);
  }
}

async function updateProfile(accountId, firstName) {
  try {
    const profile = await prisma.profile.update({
      where: { accountId },
      data: { firstName },
    });

    console.log("Updated profile:", profile);
    return profile;
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
}

async function deleteAccountAndRelations(id) {
  try {
    const account = await prisma.account.findUnique({ where: { id } });
    if (!account) throw new Error("Account does not exist");

    await prisma.module.deleteMany({ where: { accountId: id } });
    await prisma.profile.delete({ where: { accountId: id } });
    const deletedAccount = await prisma.account.delete({ where: { id } });

    console.log("Deleted account and related data:", deletedAccount);
    return deletedAccount;
  } catch (error) {
    console.error("Error deleting account:", error.message);
  }
}

async function main() {
  try {
    console.log("\n--- CREATING DATA ---");
    const account = await createAccount();
    if (!account) return;

    await createModule(account.id);

    console.log("\n--- READING DATA ---");
    await getAccountById(account.id);

    console.log("\n--- UPDATING DATA ---");
    await updateAccount(account.id, `updated-${Date.now()}@example.com`);
    await updateProfile(account.id, "Jane");

    console.log("\n--- DELETING DATA ---");
    // Uncomment to delete account and related data
    // await deleteAccountAndRelations(account.id);

    console.log("\nAll operations completed successfully!");
  } catch (error) {
    console.error("Main function error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
