/*
  Warnings:

  - You are about to drop the `Condition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_conditionId_fkey";

-- DropTable
DROP TABLE "Condition";
