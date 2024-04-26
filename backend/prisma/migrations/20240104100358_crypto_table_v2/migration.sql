/*
  Warnings:

  - You are about to drop the column `is_favorit` on the `CryptoCurrency` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CryptoCurrency" DROP COLUMN "is_favorit",
ADD COLUMN     "is_favorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CryptoCurrencyUser" ADD COLUMN     "is_favorite" BOOLEAN NOT NULL DEFAULT false;
