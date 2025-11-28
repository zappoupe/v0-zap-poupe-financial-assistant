'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useFamilia } from "@/hooks/use-familia"

export default function FamiliaPage() {
  const { membros, loading, adicionarMembro } = useFamilia()
  const [formData, setFormData] = useState({ nome: '', telefone: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleAddMembro = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    const result = await adicionarMembro(formData.nome, formData.telefone)
    
    if (result.success) {
      setFormData({ nome: '', telefone: '' })
      alert("Membro adicionado com sucesso!")
    } else {
      alert("Erro ao adicionar: " + result.error)
    }
    
    setSubmitting(false)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Plano Família</h1>
        <p className="text-muted-foreground">Gerencie os membros da sua família e compartilhe o controle financeiro</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Membros da Família</CardTitle>
              <CardDescription>Pessoas que compartilham o acesso ao ZapPoupe com você</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  [1, 2].map(i => <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />)
                ) : membros.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Você ainda não faz parte de uma família. Adicione alguém para começar!
                  </p>
                ) : (
                  membros.map((membro) => (
                    <div key={membro.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {membro.nomewpp?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{membro.nomewpp}</p>
                          <p className="text-sm text-muted-foreground">{membro.telefone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${membro.role === 'admin' ? 'bg-primary/10 text-primary font-medium' : 'bg-muted text-muted-foreground'}`}>
                          {membro.role === 'admin' ? 'Administrador' : 'Membro'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Membro</CardTitle>
              <CardDescription>Convide alguém para se juntar ao seu plano</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddMembro} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Familiar</Label>
                  <Input 
                    id="nome" 
                    placeholder="Ex: Esposa, Filho" 
                    value={formData.nome}
                    onChange={e => setFormData({...formData, nome: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone (WhatsApp)</Label>
                  <Input 
                    id="telefone" 
                    placeholder="5511999999999" 
                    value={formData.telefone}
                    onChange={e => setFormData({...formData, telefone: e.target.value})}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={submitting}>
                  {submitting ? "Adicionando..." : "Adicionar Membro"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  O número deve estar no formato internacional (55 + DDD + Número)
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}