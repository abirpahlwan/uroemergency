import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import type { Media } from '@/payload-types'
import { RichTextRenderer } from '../../components/RichTextRenderer'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config: await config })
  const guidance = await payload.findByID({ collection: 'guidances', id: Number(id) }).catch(() => null)
  return { title: guidance ? `${guidance.name} — Uro Emergency` : 'Guidance' }
}

export default async function GuidanceDetailPage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config: await config })
  const guidance = await payload.findByID({ collection: 'guidances', id: Number(id), depth: 1 }).catch(() => null)

  if (!guidance) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/guidances" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        ← Guidances
      </Link>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">{guidance.name}</h1>

      <div className="flex flex-col gap-4">
        {guidance.description && (
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <div className="px-6 pt-6 pb-3 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Description
              </p>
            </div>
            <div className="px-6 pb-6 pt-4">
              <RichTextRenderer data={guidance.description as any} />
            </div>
          </div>
        )}

        {guidance.images && guidance.images.length > 0 && (
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <div className="px-6 pt-6 pb-3 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Images
              </p>
            </div>
            <div className="px-6 pb-6 pt-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {guidance.images.map((item, i) => {
                  const media = item.image as Media
                  if (!media?.url) return null
                  return (
                    <Image
                      key={item.id ?? i}
                      src={media.url}
                      alt={media.alt || guidance.name}
                      width={media.width || 400}
                      height={media.height || 300}
                      className="h-40 w-full rounded-md border border-border object-cover"
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {guidance.references && guidance.references.length > 0 && (
          <div className="rounded-lg border border-border bg-card text-card-foreground">
            <div className="px-6 pt-6 pb-3 border-b border-border">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                References
              </p>
            </div>
            <div className="px-6 pb-6 pt-4">
              <ol className="flex flex-col gap-2">
                {guidance.references.map((ref, i) => (
                  <li key={ref.id ?? i} className="flex gap-3 text-sm">
                    <span className="shrink-0 text-muted-foreground">{i + 1}.</span>
                    {ref.url
                      ? <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-foreground/80 underline-offset-2 hover:underline">{ref.title}</a>
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
