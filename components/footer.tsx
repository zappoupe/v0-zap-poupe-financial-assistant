import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-xl">💬</div>
              <span className="text-xl font-bold">ZapPoupe</span>
            </Link>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              Seu assistente financeiro inteligente direto no WhatsApp.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Plano Família
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Premium
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Segurança
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary-foreground/20">
          <p className="text-center text-sm text-secondary-foreground/60">
            © 2025 ZapPoupe. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
