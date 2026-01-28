'use client'

import { Profile } from '@/domain/entities/profile.entity'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

interface FooterProps {
  profile: Profile
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {profile.name}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {profile.github && (
              <Link
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
            {profile.linkedin && (
              <Link
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            )}
            {profile.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
