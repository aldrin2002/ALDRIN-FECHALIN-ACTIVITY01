/*
  Warnings:

  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `module` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountId` on the `module` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `module` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `module` table. All the data in the column will be lost.
  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountId` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updateAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountCode` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleCode` to the `Module` table without a default value. This is not possible if the table is not empty.
  - The required column `recID` was added to the `Module` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updateAt` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `module` DROP FOREIGN KEY `Module_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_accountId_fkey`;

-- DropIndex
DROP INDEX `Module_accountId_fkey` ON `module`;

-- DropIndex
DROP INDEX `Profile_accountId_key` ON `profile`;

-- AlterTable
ALTER TABLE `account` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `module` DROP PRIMARY KEY,
    DROP COLUMN `accountId`,
    DROP COLUMN `id`,
    DROP COLUMN `title`,
    ADD COLUMN `accountCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `moduleCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `moduleDesc` VARCHAR(191) NULL,
    ADD COLUMN `moduleDetails` VARCHAR(191) NULL,
    ADD COLUMN `recID` VARCHAR(191) NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`recID`);

-- AlterTable
ALTER TABLE `profile` DROP PRIMARY KEY,
    DROP COLUMN `accountId`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `middlename` VARCHAR(191) NULL,
    ADD COLUMN `picture` VARCHAR(191) NULL,
    ADD COLUMN `suffix` VARCHAR(191) NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Account_username_key` ON `Account`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_userId_key` ON `Profile`(`userId`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_accountCode_fkey` FOREIGN KEY (`accountCode`) REFERENCES `Account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
