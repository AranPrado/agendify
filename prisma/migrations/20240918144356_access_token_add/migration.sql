/*
  Warnings:

  - Added the required column `accessToken` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessToken` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Clients` ADD COLUMN `accessToken` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Provider` ADD COLUMN `accessToken` VARCHAR(191) NOT NULL;
