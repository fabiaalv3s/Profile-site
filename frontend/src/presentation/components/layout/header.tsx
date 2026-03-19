'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { Button } from '../ui/button'
import { ThemeToggle } from '../ui/theme-toggle'
import { Globe } from 'lucide-react'

export function Header() {
  const t = useTranslations('common')
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<
    'about' | 'experience' | 'projects' | 'contact' | null
  >(null)

  const toggleLocale = () => {
    const currentLocale = pathname.split('/')[1] || 'pt'
    const newLocale = currentLocale === 'pt' ? 'en' : 'pt'
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    window.location.href = newPath
  }

  const navItems = useMemo(
    () =>
      [
        { id: 'about', label: t('about'), href: '/#about' },
        { id: 'experience', label: t('experience'), href: '/#experience' },
        { id: 'projects', label: t('projects'), href: '/#projects' },
        { id: 'contact', label: t('contact'), href: '/#contact' },
      ] as const,
    [t]
  )

  useEffect(() => {
    const ids = navItems.map((i) => i.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Fallback: ao chegar no fim da página, manter Contato ativo
        const isNearPageBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 24
        if (isNearPageBottom) {
          setActiveSection('contact')
          return
        }

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id as typeof ids[number])
        }
      },
      {
        threshold: [0.12, 0.24, 0.4],
        // Favorece detectar a seção final (contact) mesmo com altura menor
        rootMargin: '-18% 0px -48% 0px',
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [navItems])

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash?.replace('#', '')
      if (hash === 'about' || hash === 'experience' || hash === 'projects' || hash === 'contact') {
        setActiveSection(hash)
      }
    }

    const syncContactFromScroll = () => {
      const isNearPageBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 24
      if (window.location.hash === '#contact' || isNearPageBottom) {
        setActiveSection('contact')
      }
    }

    syncFromHash()
    syncContactFromScroll()
    window.addEventListener('hashchange', syncFromHash)
    window.addEventListener('scroll', syncContactFromScroll, { passive: true })
    return () => {
      window.removeEventListener('hashchange', syncFromHash)
      window.removeEventListener('scroll', syncContactFromScroll)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Portfolio</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={[
                  'relative pb-1 transition-colors hover:text-foreground/80',
                  // Sublinhado sem deslocar layout
                  "after:absolute after:-bottom-[2px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:origin-left after:scale-x-0 after:transition-transform after:duration-200",
                  isActive ? 'after:scale-x-100 text-primary' : 'hover:after:scale-x-100',
                ].join(' ')}
              >
                {item.label}
              </Link>
            )
          })}
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
