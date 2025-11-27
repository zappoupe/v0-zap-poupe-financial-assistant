const steps = [
  {
    icon: "💬",
    title: "Conecte ao WhatsApp",
    description: "Adicione o ZapPoupe nos seus contatos e comece a enviar mensagens",
  },
  {
    icon: "🧠",
    title: "Registre Automaticamente",
    description: "Nossa IA categoriza e organiza seus gastos e receitas inteligentemente",
  },
  {
    icon: "📊",
    title: "Visualize Relatórios",
    description: "Acesse gráficos detalhados e análises do seu comportamento financeiro",
  },
  {
    icon: "🎯",
    title: "Crie Metas",
    description: "Defina objetivos financeiros e receba alertas personalizados",
  },
  {
    icon: "🏦",
    title: "Economize Mais",
    description: "Identifique oportunidades de economia e alcance seus sonhos",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Como funciona?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Um processo simples e eficaz para transformar sua vida financeira
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg text-3xl">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-base">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
