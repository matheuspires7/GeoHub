-- AlterTable
ALTER TABLE `pais` ADD COLUMN `inflacao` DECIMAL(5, 2) NULL,
    ADD COLUMN `pib_per_capita` DECIMAL(15, 2) NULL,
    ADD COLUMN `url_bandeira` VARCHAR(255) NULL;
