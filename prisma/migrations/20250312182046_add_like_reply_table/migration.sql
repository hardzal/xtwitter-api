-- CreateTable
CREATE TABLE "likeReplies" (
    "id" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likeReplies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likeReplies" ADD CONSTRAINT "likeReplies_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeReplies" ADD CONSTRAINT "likeReplies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
