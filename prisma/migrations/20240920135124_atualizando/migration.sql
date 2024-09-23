/*
  Warnings:

  - You are about to drop the column `status` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `statusClient` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusProvider` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `status`,
    ADD COLUMN `statusClient` ENUM('pending', 'confirmed', 'canceled', 'completed', 'rejectd') NOT NULL,
    ADD COLUMN `statusProvider` ENUM('pending', 'confirmed', 'canceled', 'completed', 'rejectd') NOT NULL;
