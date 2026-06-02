import React from 'react'
import '../globals.css'
import './styles.css'
import { NavBar } from './components/NavBar'

export const metadata = {
  description: 'Clinical reference for urology emergencies, guidelines, and drug indications.',
  title: 'Uro Emergency',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
