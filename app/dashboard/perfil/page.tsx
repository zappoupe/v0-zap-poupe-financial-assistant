import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { getPerfilUsuario, atualizarPerfil } from "@/app/actions/usuario"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function PerfilPage() {
  const perfil = await getPerfilUsuario()

  if (!perfil) {
    redirect('/login')
  }

  const hoje = new Date()
  const dataFimTrial = perfil.trial_ended ? new Date(perfil.trial_ended) : null
  const isPremium = dataFimTrial && dataFimTrial > hoje
  const diasRestantes = dataFimTrial ? Math.ceil((dataFimTrial.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)) : 0

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
        <p className="text-muted-foreground">Gerencie suas informações e preferências</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-primary text-primary-foreground text-2xl flex items-center justify-center rounded-full">
                {perfil.nomewpp?.substring(0, 2).toUpperCase() || "US"}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{perfil.nomewpp}</h3>
                <p className="text-sm text-muted-foreground">{perfil.telefone}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-white ${isPremium ? 'bg-primary' : 'bg-gray-500'}`}>
                {isPremium ? 'Premium' : 'Gratuito'}
              </div>
              <Separator />
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status IA</span>
                  <span className="font-medium">{perfil.atendimento_ia === 'ativo' ? '🟢 Ativo' : '🔴 Pausado'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <Tabs defaultValue="pessoal">
            <CardHeader>
              <TabsList className="grid grid-cols-3 w-full max-w-2xl">
                <TabsTrigger value="pessoal">Pessoal</TabsTrigger>
                <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
                <TabsTrigger value="assinatura">Assinatura</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="space-y-6">
              <TabsContent value="pessoal" className="space-y-6 mt-0">
                <form action={atualizarPerfil}>
                  <input type="hidden" name="telefone" value={perfil.telefone} />
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Informações Básicas</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome no WhatsApp</Label>
                        <Input id="nome" name="nome" defaultValue={perfil.nomewpp} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone Conectado</Label>
                        <Input id="telefone" value={perfil.telefone} disabled className="bg-muted" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button type="submit" className="bg-primary text-primary-foreground">Salvar Alterações</Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="configuracoes" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Notificações</h3>
                  <div className="space-y-4">
                    <Card className="bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Resumo Semanal</p>
                            <p className="text-sm text-muted-foreground">Receber relatório financeiro toda segunda-feira</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Alertas de Gastos</p>
                            <p className="text-sm text-muted-foreground">Avisar quando exceder o orçamento previsto</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assinatura" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">Status do Plano</h3>
                  <Card className={`border-l-4 ${isPremium ? 'border-l-green-500 bg-green-50/50' : 'border-l-red-500 bg-red-50/50'}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{isPremium ? 'Plano Premium Ativo' : 'Período de Teste Expirado'}</h4>
                          <p className="text-sm text-muted-foreground">
                            {isPremium 
                              ? `Sua assinatura é válida até ${dataFimTrial?.toLocaleDateString('pt-BR')}`
                              : 'Renove para continuar aproveitando todos os recursos do ZapPoupe.'}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-white ${isPremium ? 'bg-green-600' : 'bg-red-500'}`}>
                          {isPremium ? 'Ativo' : 'Inativo'}
                        </div>
                      </div>
                      
                      {isPremium && (
                        <p className="text-sm font-medium text-green-700 mb-4">
                          Você tem {diasRestantes} dias restantes.
                        </p>
                      )}

                      {!isPremium && (
                        <Button className="w-full sm:w-auto bg-primary text-primary-foreground">
                          Renovar Agora
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}