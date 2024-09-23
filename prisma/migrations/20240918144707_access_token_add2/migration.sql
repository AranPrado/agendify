-- AlterTable
ALTER TABLE `Clients` MODIFY `accessToken` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Provider` MODIFY `accessToken` VARCHAR(191) NOT NULL DEFAULT '';
