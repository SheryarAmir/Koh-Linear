import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 container mx-auto mt-18">
      <div className="flex flex-col items-center justify-between gap-4 py-6 px-4 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded bg-primary" />
            <span className="font-bold tracking-tight">Koh-Linear</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with precision and care for modern workflows.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/support" className="transition-colors hover:text-foreground">
              Support
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="flex flex-col items-center justify-center gap-2 py-4 md:flex-row px-4">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kho-Linear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
