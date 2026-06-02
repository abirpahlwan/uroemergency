import Link from 'next/link'
import React from 'react'

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-bold tracking-tight text-foreground hover:text-foreground/80">
          Uro Emergency
        </Link>
        <div className="flex gap-6">
          <Link href="/emergencies" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Emergencies
          </Link>
          <Link href="/guidances" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Guidances
          </Link>
          <Link href="/drugs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Drugs
          </Link>
        </div>
      </div>
    </nav>
  )
}
