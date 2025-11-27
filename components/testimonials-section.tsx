import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Maria Silva",
    role: "Professora",
    content: "Economizei mais de R$ 800 no primeiro mês! O ZapPoupe me mostrou gastos que eu nem sabia que tinha.",
    rating: 5,
    initials: "MS",
  },
  {
    name: "João Santos",
    role: "Empreendedor",
    content: "Finalmente consigo organizar as finanças da família. O plano compartilhado é perfeito para nós.",
    rating: 5,
    initials: "JS",
  },
  {
    name: "Ana Costa",
    role: "Designer",
    content: "Super prático usar pelo WhatsApp. Não preciso de mais um app, registro tudo na hora que gasto.",
    rating: 5,
    initials: "AC",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Mais de 50 mil pessoas já economizam com o ZapPoupe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Veja o que nossos usuários estão dizendo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-primary text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
