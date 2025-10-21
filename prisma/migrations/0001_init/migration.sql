-- CreateEnum
CREATE TYPE "TermStatus" AS ENUM ('draft', 'approved');

-- CreateTable
CREATE TABLE "Org" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Org_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Glossary" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Glossary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" TEXT NOT NULL,
    "glossaryId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "definition" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermLocale" (
    "id" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "note" TEXT,
    "status" "TermStatus" NOT NULL DEFAULT 'draft',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TermLocale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Glossary_orgId_idx" ON "Glossary"("orgId");

-- CreateIndex
CREATE INDEX "Term_glossaryId_idx" ON "Term"("glossaryId");

-- CreateIndex
CREATE UNIQUE INDEX "Term_glossaryId_key_key" ON "Term"("glossaryId", "key");

-- CreateIndex
CREATE INDEX "TermLocale_termId_idx" ON "TermLocale"("termId");

-- CreateIndex
CREATE UNIQUE INDEX "TermLocale_termId_language_key" ON "TermLocale"("termId", "language");

-- AddForeignKey
ALTER TABLE "Glossary" ADD CONSTRAINT "Glossary_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_glossaryId_fkey" FOREIGN KEY ("glossaryId") REFERENCES "Glossary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermLocale" ADD CONSTRAINT "TermLocale_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

