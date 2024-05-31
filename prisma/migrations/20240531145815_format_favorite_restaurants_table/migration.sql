/*
  Warnings:

  - The primary key for the `FavoriteRestaurants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FavoriteRestaurants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FavoriteRestaurants" DROP CONSTRAINT "FavoriteRestaurants_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "FavoriteRestaurants_pkey" PRIMARY KEY ("userId", "restaurantId");
