  import Nav from '../../components/Nav'
  import Link from 'next/link'
  import { getProjeto, getArtefatos } from '../../lib/api'
  import { notFound } from 'next/navigation'
  import MarkdownContent from '../../components/MarkdownContent'

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
        <div style={{
          padding: '12px clamp(16px,3vw,48px)',
          borderBottom: '1px solid var(--gray-200)',
          display: 'flex', gap: '8px', alignItems: 'center',
        }}>
          <Link href="/" style={{ fontSize: '11px', fontWeight: 400, color: 'var(--gray-400)', textDecoration: 'none', letterSpacing: '0.5px' }}>Home</Link>
          <span style={{ color: 'var(--gray-200)', fontSize: '11px' }}>→</span>
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--black)' }}>{projeto.nome}</span>
        </div>

        {/* PROJECT HERO */}
        <div style={{
          padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0',
          borderBottom: '2px solid var(--black)',
        }}>
          <div style={{
            fontSize: '9px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px',
          }}>
            Projeto de Pesquisa{projeto.financiamento ? ` · ${projeto.financiamento}` : ''}
          </div>
          <div style={{
            fontSize: 'clamp(36px,8vw,96px)', fontWeight: 900,
            letterSpacing: '-2px', lineHeight: 0.92,
          }}>
            {projeto.nome}
          </div>
          <div style={{
            fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300,
            color: 'var(--gray-600)', marginTop: '20px', maxWidth: '640px', lineHeight: 1.7,
          }}>
            {projeto.descricao}
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5,1fr)',
            marginTop: '32px', borderTop: '1px solid var(--gray-200)',
          }}>

          {/*<div className="projeto-info-grid" style={{ marginTop: '32px', borderTop: '1px solid var(--gray-200)' }}>*/}
            {[
              { label: 'Status', val: projeto.status?.replace(/_/g, ' ') },
              { label: 'Período', val: projeto.periodo },
              { label: 'Pesquisador', val: projeto.pesquisador },
              { label: 'Artefatos', val: `${artefatos.length} gerados` },
            ].map((item, i) => (
              <div key={item.label} className="projeto-info-cell" style={{
                padding: '20px 0',
                borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none',
                paddingRight: i < 3 ? '24px' : '0',
                paddingLeft: i > 0 ? '24px' : '0',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', display: 'block', marginBottom: '6px' }}>{item.label}</span>
                <div style={{ fontSize: '16px', fontWeight: 400 }}>{item.val || '—'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECT BODY */}
        <div className="projeto-main-grid">

          {/* MAIN */}
          <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)', borderRight: '1px solid var(--gray-200)' }}>

            {/* CONTEÚDO MARKDOWN */}
            {projeto.conteudo && (
              <div style={{ marginBottom: '56px' }}>
                <div style={{
                  fontSize: '10px', fontWeight: 700, letterSpacing: '3px',
                  textTransform: 'uppercase', color: 'var(--gray-400)',
                  marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  Sobre o projeto
                  <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
                </div>
                <MarkdownContent content={projeto.conteudo} />
              </div>
            )}

            {/* ARTEFATOS */}
            <div style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '3px',
              textTransform: 'uppercase', color: 'var(--gray-400)',
              marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              Artefatos gerados
              <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
            </div>

            {artefatos.length === 0 ? (
              <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-400)', padding: '32px 0' }}>
                Nenhum artefato gerado ainda.
              </div>
            ) : (
              <div className="artifacts-grid">
                {artefatos.map((a: any, i: number) => (
                  <Link key={a.slug} href={`/artefatos/${a.slug}`} style={{
                    padding: 'clamp(20px,3vw,32px)',
                    borderRight: i % 2 === 0 ? '1px solid var(--gray-200)' : 'none',
                    borderBottom: '1px solid var(--gray-200)',
                    textDecoration: 'none', color: 'var(--black)', display: 'block',
                  }} className="artifact-card">
                    <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: CORES[a.tipo] || 'var(--gray-400)', marginBottom: '16px' }}></div>
                    <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '8px' }}>{a.tipo.replace(/_/g, ' ')}</div>
                    <div style={{ fontSize: 'clamp(14px,2vw,18px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.3px', lineHeight: 1.2 }}>{a.titulo}</div>
                    <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--gray-400)', marginTop: '8px' }}>
                      {new Date(a.criado_em).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })} · {a.versao}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{ padding: 'clamp(24px,3vw,40px) clamp(16px,3vw,32px)' }}>
            {projeto.status_pesquisa && projeto.status_pesquisa.length > 0 && (
              <div>
                <div style={{
                  fontSize: '9px', fontWeight: 700, letterSpacing: '3px',
                  textTransform: 'uppercase', color: 'var(--gray-400)',
                  marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  Status da pesquisa
                  <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {projeto.status_pesquisa.map((item: any, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: STATUS_CORES[item.status] || 'var(--gray-200)',
                        flexShrink: 0, marginTop: '4px',
                      }}></div>
                      <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.5 }}>
                        <strong style={{ fontWeight: 500, color: 'var(--black)', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{item.etapa}</strong>
                        {item.descricao}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projeto.fontes && projeto.fontes.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <div style={{
                  fontSize: '9px', fontWeight: 700, letterSpacing: '3px',
                  textTransform: 'uppercase', color: 'var(--gray-400)',
                  marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  Fontes de dados
                  <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {projeto.fontes.map((fonte: any, i: number) => (
                    fonte.url ? (
                      <Link key={i} href={fonte.url} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px', border: '1px solid var(--gray-200)',
                        textDecoration: 'none', color: 'var(--black)',
                      }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gray-400)', flexShrink: 0 }}></div>
                        <span style={{ fontSize: '12px', fontWeight: 500, flex: 1 }}>{fonte.nome}</span>
                        <span style={{ marginLeft: 'auto', color: 'var(--gray-400)', fontSize: '14px' }}>→</span>
                      </Link>
                    ) : (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px', border: '1px solid var(--gray-200)',
                      }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gray-400)', flexShrink: 0 }}></div>
                        <span style={{ fontSize: '12px', fontWeight: 500 }}>{fonte.nome}</span>
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
