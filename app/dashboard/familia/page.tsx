async function fetchFamilia() {
  const { data: membros } = await supabase
    .from('dados_cliente')
    .select(`
      id, 
      nomewpp, 
      telefone,
      planos_familia ( id, admin_telefone )
    `)
    .eq('family_id', 'id_da_familia_do_usuario')
}