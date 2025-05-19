/*
  Warnings:

  - You are about to drop the column `event` on the `EventIndividualRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `event` on the `EventTeamRegistration` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `EventIndividualRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `EventTeamRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventIndividualRegistration" DROP COLUMN "event",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EventTeamRegistration" DROP COLUMN "event",
ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceRegistration" ADD COLUMN     "status" TEXT DEFAULT 'pending';

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "registrationDeadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventIndividualRegistration" ADD CONSTRAINT "EventIndividualRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTeamRegistration" ADD CONSTRAINT "EventTeamRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
