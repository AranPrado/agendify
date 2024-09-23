-- AlterTable
ALTER TABLE `Appointment` MODIFY `status` ENUM('pending', 'confirmed', 'canceled', 'completed', 'rejectd') NOT NULL;
