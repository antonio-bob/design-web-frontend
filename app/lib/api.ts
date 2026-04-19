const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.design.antoniobob.com'

export async function getProjetos() {
  const res = await fetch(`${API_URL}/api/projetos/`)
  if (!res.ok) return []
  return res.json()
}

export async function getProjeto(slug: string) {
  const res = await fetch(`${API_URL}/api/projetos/${slug}`)
  if (!res.ok) return null
  return res.json()
}

export async function getArtefatos(params?: { tipo?: string, projeto?: string }) {
  const q = new URLSearchParams(params as any).toString()
  const res = await fetch(`${API_URL}/api/artefatos/${q ? '?' + q : ''}`)
  if (!res.ok) return []
  return res.json()
}

export async function getArtefato(slug: string) {
  const res = await fetch(`${API_URL}/api/artefatos/${slug}`)
  if (!res.ok) return null
  return res.json()
}

export async function getMetodos(fase?: string) {
  const q = fase ? `?fase=${fase}` : ''
  const res = await fetch(`${API_URL}/api/metodos/${q}`)
  if (!res.ok) return []
  return res.json()
}

export async function getMetodo(slug: string) {
  const res = await fetch(`${API_URL}/api/metodos/${slug}`)
  if (!res.ok) return null
  return res.json()
}
