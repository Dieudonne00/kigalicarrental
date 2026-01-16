-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "gameDrive" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Car_gameDrive_idx" ON "Car"("gameDrive");
