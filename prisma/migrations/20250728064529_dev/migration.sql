/*
  Warnings:

  - You are about to drop the `landing_page_content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "landing_page_content";

-- CreateTable
CREATE TABLE "landing_pages" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "content" JSONB NOT NULL,

    CONSTRAINT "landing_pages_pkey" PRIMARY KEY ("id")
);
