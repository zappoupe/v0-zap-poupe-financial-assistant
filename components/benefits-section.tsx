import { Card } from "@/components/ui/card"

const benefits = [
  {
    icon: "📉",
    title: "Economia de Custos",
    description: "Identifique gastos desnecessários e economize até 30% todo mês",
  },
  {
    icon: "💰",
    title: "Controle Total",
    description: "Acompanhe cada centavo que entra e sai com categorização automática",
  },
  {
    icon: "👁️",
    title: "Clareza Financeira",
    description: "Visualize sua saúde financeira com relatórios inteligentes e intuitivos",
  },
  {
    icon: "👥",
    title: "Organização Familiar",
    description: "Gerencie as finanças de toda família em um só lugar com plano compartilhado",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Por que escolher o ZapPoupe?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Transforme sua relação com o dinheiro através de ferramentas simples e poderosas
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
