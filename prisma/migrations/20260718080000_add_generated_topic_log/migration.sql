-- CreateTable
CREATE TABLE "GeneratedTopicLog" (
    "id" TEXT NOT NULL,
    "topicKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedTopicLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GeneratedTopicLog_topicKey_idx" ON "GeneratedTopicLog"("topicKey");

-- CreateIndex
CREATE INDEX "GeneratedTopicLog_createdAt_idx" ON "GeneratedTopicLog"("createdAt");
