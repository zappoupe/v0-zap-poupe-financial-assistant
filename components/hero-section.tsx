import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Conecte-se ao WhatsApp
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Seu assistente financeiro direto no <span className="text-primary">WhatsApp</span>
            </h1>

            <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-xl">
              Organize suas finanças, controle gastos e economize dinheiro de forma simples e inteligente. Tudo isso sem
              sair do app que você mais usa.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 text-base">
                <Link href="/cadastro">
                  Criar Conta Grátis
                  <span className="ml-2">→</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="#como-funciona">Como Funciona</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Gratuito para começar</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Sem cartão de crédito</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-6xl">📱</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-2xl p-4">
                    <p className="text-sm font-medium text-primary mb-1">Você</p>
                    <p className="text-foreground">Gastei R$ 45 no almoço</p>
                  </div>
                  <div className="bg-muted rounded-2xl p-4">
                    <p className="text-sm font-medium text-primary mb-1">ZapPoupe</p>
                    <p className="text-foreground">✓ Registrado! Categoria: Alimentação</p>
                    <p className="text-sm text-muted-foreground mt-2">Você já gastou R$ 450 este mês</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
