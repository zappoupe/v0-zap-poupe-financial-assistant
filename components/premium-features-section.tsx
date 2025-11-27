import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: "📊",
    title: "Dashboard Completo",
    description: "Visualize todos seus dados financeiros em tempo real com gráficos interativos",
  },
  {
    icon: "📄",
    title: "Relatórios Avançados",
    description: "Análises profundas com comparativos mensais, projeções e insights personalizados",
  },
  {
    icon: "🏷️",
    title: "Categorias Inteligentes",
    description: "IA categoriza automaticamente gastos e aprende com seus hábitos",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Plano Família",
    description: "Gerencie finanças de múltiplos membros com controles e permissões individuais",
  },
  {
    icon: "📅",
    title: "Calendário Financeiro",
    description: "Agende pagamentos, defina lembretes e nunca mais perca um vencimento",
  },
  {
    icon: "✨",
    title: "Previsões com IA",
    description: "Receba projeções inteligentes sobre seu futuro financeiro baseadas em comportamento",
  },
]

export function PremiumFeaturesSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span>✨</span>
            Recursos Premium
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Tudo que você precisa para dominar suas finanças
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ferramentas profissionais para levar seu controle financeiro ao próximo nível
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/cadastro">Começar Agora Gratuitamente</Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">Sem cartão de crédito • Cancele quando quiser</p>
        </div>
      </div>
    </section>
  )
}
