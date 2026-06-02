import React from 'react'
import '../globals.css'
import './styles.css'

export const metadata = {
  description: 'Clinical reference for urology emergencies, guidelines, and drug indications.',
  title: 'Uro Emergency',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
