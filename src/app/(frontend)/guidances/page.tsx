import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { NavBar } from '../components/NavBar'

export const metadata = { title: 'Guidances — Uro Emergency' }

export default async function GuidancesPage() {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'guidances',
    limit: 100,
    sort: '_order',
  })

  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Guidances</h1>
          <p className="mt-1 text-sm text-muted-foreground">Evidence-based clinical guidelines</p>
        </div>

        {docs.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No guidances found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {docs.map((guidance) => (
              <Link
                key={guidance.id}
                href={`/guidances/${guidance.id}`}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4 text-card-foreground transition-colors hover:border-foreground/30 hover:bg-accent"
              >
                <span className="text-sm font-semibold">{guidance.name}</span>
                <span className="text-muted-foreground">›</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
