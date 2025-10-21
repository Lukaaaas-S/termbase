// scripts/import-termbase.mjs
import { PrismaClient } from '@prisma/client'
import fs from 'node:fs/promises'
import { parse } from 'csv-parse/sync'

const prisma = new PrismaClient()

const CSV_PATH = process.env.CSV_PATH || 'data/termbase_import_full_UTF-8.csv'
const ORG_NAME = process.env.ORG_NAME || 'QYSEA'

function normStatus(s) {
  s = String(s ?? '').trim().toLowerCase()
  return s === 'approved' ? 'approved' : 'draft'
}
function parseTags(s) {
  if (!s) return []
  return String(s).split('|').map(t => t.trim()).filter(Boolean)
}

async function ensureOrg(name) {
  let org = await prisma.org.findFirst({ where: { name } })
  if (!org) org = await prisma.org.create({ data: { name } })
  return org
}

const glossaryCache = new Map()
async function ensureGlossary(orgId, name, description = '') {
  const key = `${orgId}:${name}`
  if (glossaryCache.has(key)) return glossaryCache.get(key)
  let g = await prisma.glossary.findFirst({ where: { orgId, name } })
  if (!g) g = await prisma.glossary.create({ data: { orgId, name, description } })
  glossaryCache.set(key, g)
  return g
}

async function main() {
  const csv = await fs.readFile(CSV_PATH, 'utf8')
  const rows = parse(csv, { columns: true, skip_empty_lines: true, trim: true })

  const org = await ensureOrg(ORG_NAME)

  let processed = 0
  for (const r of rows) {
    const glossaryName = r.glossary?.trim()
    const term_key = r.term_key?.trim()
    const language = r.language?.trim().toLowerCase()
    const text = (r.text ?? '').toString().trim()
    if (!glossaryName || !term_key || !language || !text) continue

    const definition = (r.definition ?? '').toString()
    const tags = parseTags(r.tags)
    const status = normStatus(r.status)
    const note = (r.note ?? '').toString()

    const glossary = await ensureGlossary(org.id, glossaryName)

    const term = await prisma.term.upsert({
      where: { glossaryId_key: { glossaryId: glossary.id, key: term_key } },
      update: { definition, tags },
      create: { glossaryId: glossary.id, key: term_key, definition, tags }
    })

    await prisma.termLocale.upsert({
      where: { termId_language: { termId: term.id, language } },
      update: { text, note, status },
      create: { termId: term.id, language, text, note, status }
    })

    processed++
    if (processed % 200 === 0) console.log(`Processed ${processed} rows...`)
  }

  const termCount = await prisma.term.count()
  const localeCount = await prisma.termLocale.count()
  console.log(`✔ Import finished. Terms: ${termCount}, Locales: ${localeCount}`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
