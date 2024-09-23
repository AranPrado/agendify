/*
  Warnings:

  - Made the column `aboutMe` on table `Provider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Provider` MODIFY `aboutMe` VARCHAR(191) NOT NULL;
