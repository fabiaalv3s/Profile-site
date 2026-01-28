import { Link } from '@/i18n/routing'
import { Button } from '@/presentation/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-muted-foreground">Página não encontrada</p>
      <Button asChild className="mt-8">
        <Link href="/">Voltar para home</Link>
      </Button>
    </div>
  )
}
