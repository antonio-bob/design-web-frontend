import Nav from '../../components/Nav'
import Link from 'next/link'
import { getProjeto, getArtefatos } from '../../lib/api'
import { notFound } from 'next/navigation'

const CORES: Record<string, string> = {
  persona: 'var(--coral)',
  journey_map: 'var(--blue)',
  future_journey_map: 'var(--blue)',
  system_map: 'var(--green)',
  hmw: 'var(--green)',
  key_insight: 'var(--yellow)',
  jtbd: 'var(--coral)',
  user_stories: 'var(--blue)',
  research_report: 'var(--black)',
}

export default async function ProjetoPage({ params }: { params: { slug: string } }) {
  console.log('slug recebido:', params.slug)
  const projeto = await getProjeto(params.slug)
  console.log('projeto encontrado:', projeto)
  if (!projeto) notFound()

  const artefatos = await getArtefatos({ projeto: params.slug })

  return (
    <>
      <Nav />

      {/* BREADCRUMB */}
      <div style={{ padding: '12px clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: 'var(--gray-400)' }}>
        <Link href="/">design.antoniobob.com</Link>
        <span style={{ color: 'var(--gray-200)' }}>→</span>
        <span style={{ color: 'var(--black)', fontWeight: 500 }}>{projeto.nome}</span>
      </div>

      {/* HERO */}
      <div style={{ padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0', borderBottom: '2px solid var(--black)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px' }}>
          Projeto de Pesquisa
        </div>
        <div style={{ fontSize: 'clamp(36px,8vw,96px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 0.92 }}>
          {projeto.nome}
        </div>
        <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', marginTop: '20px', maxWidth: '640px', lineHeight: 1.7 }}>
          {projeto.descricao}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', marginTop: '32px', borderTop: '1px solid var(--gray-200)' }}>
          {[
            { label: 'Status', val: projeto.status },
            { label: 'Período', val: projeto.periodo },
            { label: 'Pesquisador', val: projeto.pesquisador },
            { label: 'Artefatos', val: `${artefatos.length} gerados` },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: '20px 0', borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none', paddingRight: i < 3 ? '24px' : '0', paddingLeft: i > 0 ? '24px' : '0' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '13px', fontWeight: 400 }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ARTEFATOS */}
      <div>
        <div style={{ padding: 'clamp(16px,3vw,32px) clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue)' }}>
          Artefatos gerados
        </div>
        {artefatos.length === 0 ? (
          <div style={{ padding: 'clamp(32px,4vw,64px) clamp(16px,3vw,48px)', fontSize: '13px', fontWeight: 300, color: 'var(--gray-400)' }}>
            Nenhum artefato gerado ainda.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {artefatos.map((a: any) => (
              <Link key={a.slug} href={`/artefatos/${a.slug}`} style={{
                padding: 'clamp(20px,3vw,32px)',
                borderRight: '1px solid var(--gray-200)',
                borderBottom: '1px solid var(--gray-200)',
                display: 'block',
              }}>
                <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: CORES[a.tipo] || 'var(--gray-400)', marginBottom: '16px' }}></div>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '8px' }}>{a.tipo.replace(/_/g, ' ')}</div>
                <div style={{ fontSize: 'clamp(14px,2vw,18px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.3px', lineHeight: 1.2 }}>{a.titulo}</div>
                <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--gray-400)', marginTop: '8px' }}>{a.versao} · {new Date(a.criado_em).toLocaleDateString('pt-BR')}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
