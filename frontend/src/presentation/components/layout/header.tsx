'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { Button } from '../ui/button'
import { ThemeToggle } from '../ui/theme-toggle'
import { Globe } from 'lucide-react'

export function Header() {
  const t = useTranslations('common')
  const pathname = usePathname()

  const toggleLocale = () => {
    const currentLocale = pathname.split('/')[1] || 'pt'
    const newLocale = currentLocale === 'pt' ? 'en' : 'pt'
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    window.location.href = newPath
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Portfolio</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/#about"
            className="transition-colors hover:text-foreground/80"
          >
            {t('about')}
          </Link>
          <Link
            href="/#experience"
            className="transition-colors hover:text-foreground/80"
          >
            {t('experience')}
          </Link>
          <Link
            href="/#projects"
            className="transition-colors hover:text-foreground/80"
          >
            {t('projects')}
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-foreground/80"
          >
            {t('contact')}
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLocale}
            aria-label="Toggle language"
          >
            <Globe className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
