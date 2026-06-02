import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { RichTextRenderer } from '../../components/RichTextRenderer'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config: await config })
  const indication = await payload.findByID({ collection: 'indications', id: Number(id) }).catch(() => null)
  return { title: indication ? `${indication.indication} — Uro Emergency` : 'Drug' }
}

type DrugEntry = {
  name: string
  instruction?: any
  sideEffects?: any
  id?: string | null
}

function DrugCard({ drug, variant }: { drug: DrugEntry; variant: 'primary' | 'alternative' }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm font-bold">{drug.name}</span>
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variant === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          {variant === 'primary' ? 'Primary' : 'Alternative'}
        </span>
      </div>
      {drug.instruction && (
        <>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Dosage & Administration
          </p>
          <RichTextRenderer data={drug.instruction} />
        </>
      )}
      {drug.sideEffects && (
        <>
          <p className="mb-1 mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Side Effects
          </p>
          <RichTextRenderer data={drug.sideEffects} />
        </>
      )}
    </div>
  )
}

export default async function DrugDetailPage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config: await config })
  const indication = await payload.findByID({ collection: 'indications', id: Number(id) }).catch(() => null)

  if (!indication) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/drugs" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        ← Drugs
      </Link>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">{indication.indication}</h1>

      <div className="flex flex-col gap-4">
        {indication.drugs && indication.drugs.length > 0 && (
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <div className="px-6 pt-6 pb-3 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Primary Drugs
              </p>
            </div>
            <div className="px-6 pb-6 flex flex-col gap-3 pt-4">
              {indication.drugs.map((drug, i) => (
                <DrugCard key={drug.id ?? i} drug={drug} variant="primary" />
              ))}
            </div>
          </div>
        )}

        {indication.alternativeDrugs && indication.alternativeDrugs.length > 0 && (
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <div className="px-6 pt-6 pb-3 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Alternative Drugs
              </p>
            </div>
            <div className="px-6 pb-6 flex flex-col gap-3 pt-4">
              {indication.alternativeDrugs.map((drug, i) => (
                <DrugCard key={drug.id ?? i} drug={drug} variant="alternative" />
              ))}
            </div>
          </div>
        )}

        {indication.notes && (
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <div className="px-6 pt-6 pb-3 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Notes
              </p>
            </div>
            <div className="px-6 pb-6 pt-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {indication.notes}
              </p>
            </div>
          </div>
        )}

        {indication.references && indication.references.length > 0 && (
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <div className="px-6 pt-6 pb-3 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                References
              </p>
            </div>
            <div className="px-6 pb-6 pt-4">
              <ol className="flex flex-col gap-2">
                {indication.references.map((ref, i) => (
                  <li key={ref.id ?? i} className="flex gap-3 text-sm">
                    <span className="shrink-0 text-muted-foreground">{i + 1}.</span>
                    {ref.link
                      ? <a href={ref.link} target="_blank" rel="noopener noreferrer" className="text-foreground/80 underline-offset-2 hover:underline">{ref.title}</a>
                      : <span>{ref.title}</span>
                    }
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
