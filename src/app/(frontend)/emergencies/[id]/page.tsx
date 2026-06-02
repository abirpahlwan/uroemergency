import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RichTextRenderer } from '../../components/RichTextRenderer'
import { NavBar } from '../../components/NavBar'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config: await config })
  const emergency = await payload.findByID({ collection: 'emergencies', id: Number(id) }).catch(() => null)
  return { title: emergency ? `${emergency.name} — Uro Emergency` : 'Emergency' }
}

export default async function EmergencyDetailPage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config: await config })
  const emergency = await payload.findByID({ collection: 'emergencies', id: Number(id) }).catch(() => null)

  if (!emergency) notFound()

  const sections = [
    { key: 'history', label: 'History', data: emergency.history },
    { key: 'examination', label: 'Examination', data: emergency.examination },
    { key: 'investigation', label: 'Investigation', data: emergency.investigation },
    { key: 'management', label: 'Management', data: emergency.management },
  ]

  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link href="/emergencies" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          ← Emergencies
        </Link>
        <h1 className="mb-8 text-2xl font-bold tracking-tight">{emergency.name}</h1>

        <div className="flex flex-col gap-4">
          {sections.map(({ key, label, data }) => (
            <Card key={key}>
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {data
                  ? <RichTextRenderer data={data as any} />
                  : <p className="text-sm text-muted-foreground">No content.</p>
                }
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
