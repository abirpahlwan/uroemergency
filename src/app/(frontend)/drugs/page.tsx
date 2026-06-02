import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

export const metadata = { title: 'Drugs — Uro Emergency' }

export default async function DrugsPage() {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'indications',
    limit: 100,
    sort: '_order',
  })

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Drugs</h1>
        <p className="mt-1 text-sm text-muted-foreground">Drug indications, dosage, and administration</p>
      </div>

      {docs.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">No drug indications found.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {docs.map((indication) => (
            <Link
              key={indication.id}
              href={`/drugs/${indication.id}`}
              className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 text-card-foreground transition-colors hover:border-foreground/30 hover:bg-accent"
            >
              <span className="text-sm font-semibold">{indication.indication}</span>
              <span className="text-muted-foreground">›</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
