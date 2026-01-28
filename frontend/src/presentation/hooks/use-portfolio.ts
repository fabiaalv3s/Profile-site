'use client'

import { useState, useEffect } from 'react'
import { PortfolioData } from '@/application/usecases/get-portfolio-data.usecase'

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/portfolio')
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data')
        }
        const portfolioData = await response.json()
        setData(portfolioData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
