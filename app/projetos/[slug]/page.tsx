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

const STATUS_CORES: Record<string, string> = {
  concluido: 'var(--green)',
  em_andamento: 'var(--yellow)',
  pendente: 'var(--gray-200)',
  cancelado: 'var(--coral)',
}

export default async function ProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projeto = await getProjeto(slug)
  if (!projeto) notFound()
  const artefatos = await getArtefatos({ projeto: slug })

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
            { label: 'Status', val: projeto.status?.replace(/_/g, ' ') },
            { label: 'Período', val: projeto.periodo },
            { label: 'Pesquisador', val: projeto.pesquisador },
            { label: 'Artefatos', val: `${artefatos.length} gerados` },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: '20px 0', borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none', paddingRight: i < 3 ? '24px' : '0', paddingLeft: i > 0 ? '24px' : '0' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '13px', fontWeight: 400 }}>{item.val || '—'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>

        {/* ARTEFATOS */}
        <div style={{ borderRight: '1px solid var(--gray-200)' }}>
          <div style={{ padding: 'clamp(16px,3vw,32px) clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue)' }}>
            Artefatos gerados
          </div>
          {artefatos.length === 0 ? (
            <div style={{ padding: 'clamp(32px,4vw,64px) clamp(16px,3vw,48px)', fontSize: '13px', fontWeight: 300, color: 'var(--gray-400)' }}>
              Nenhum artefato gerado ainda.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {artefatos.map((a: any, i: number) => (
                <Link key={a.slug} href={`/artefatos/${a.slug}`} style={{
                  padding: 'clamp(20px,3vw,28px)',
                  borderRight: i % 2 === 0 ? '1px solid var(--gray-200)' : 'none',
                  borderBottom: '1px solid var(--gray-200)',
                  display: 'block',
                  textDecoration: 'none',
                  color: 'var(--black)',
                }}>
                  <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: CORES[a.tipo] || 'var(--gray-400)', marginBottom: '14px' }}></div>
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px' }}>{a.tipo.replace(/_/g, ' ')}</div>
                  <div style={{ fontSize: 'clamp(13px,2vw,16px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.3px', lineHeight: 1.2 }}>{a.titulo}</div>
                  <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--gray-400)', marginTop: '8px' }}>
                    {a.versao} · {new Date(a.criado_em).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ padding: 'clamp(24px,3vw,40px) clamp(16px,3vw,28px)' }}>

          {/* STATUS DA PESQUISA */}
          {projeto.status_pesquisa && projeto.status_pesquisa.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Status da pesquisa
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {projeto.status_pesquisa.map((item: any, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: STATUS_CORES[item.status] || 'var(--gray-200)', flexShrink: 0, marginTop: '4px' }}></div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{item.etapa}</div>
                      <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.5 }}>{item.descricao}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FONTES DE DADOS */}
          {projeto.fontes && projeto.fontes.length > 0 && (
            <div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Fontes de dados
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {projeto.fontes.map((fonte: any, i: number) => (
                  fonte.url ? (
                    <Link key={i} href={fonte.url} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', border: '1px solid var(--gray-200)', textDecoration: 'none', color: 'var(--black)', transition: 'background .15s' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gray-400)', flexShrink: 0 }}></div>
                      <span style={{ fontSize: '12px', fontWeight: 400, flex: 1 }}>{fonte.nome}</span>
                      <span style={{ color: 'var(--gray-400)', fontSize: '14px' }}>→</span>
                    </Link>
                  ) : (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', border: '1px solid var(--gray-200)' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gray-400)', flexShrink: 0 }}></div>
                      <span style={{ fontSize: '12px', fontWeight: 400 }}>{fonte.nome}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
