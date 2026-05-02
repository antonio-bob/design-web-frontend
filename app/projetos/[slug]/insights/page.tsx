import Nav from '../../../components/Nav'
import Link from 'next/link'
import { getProjeto, getArtefatos } from '../../../lib/api'
import { notFound } from 'next/navigation'

export default async function InsightsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projeto = await getProjeto(slug)
  if (!projeto) notFound()

  const artefatos = await getArtefatos({ projeto: slug, tipo: 'key_insight' })

  const insights = artefatos.sort((a: any, b: any) => {
    const na = parseInt(a.dados?.numero || '99')
    const nb = parseInt(b.dados?.numero || '99')
    return na - nb
  })

  return (
    <>
      <Nav />

      {/* BREADCRUMB */}
      <div style={{
        padding: '12px clamp(16px,3vw,48px)',
        borderBottom: '1px solid var(--gray-200)',
        display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap',
      }}>
        <Link href="/" style={{ fontSize: '11px', fontWeight: 400, color: 'var(--gray-400)', letterSpacing: '0.5px' }}>Home</Link>
        <span style={{ color: 'var(--gray-200)', fontSize: '11px' }}>→</span>
        <Link href={`/projetos/${slug}`} style={{ fontSize: '11px', fontWeight: 400, color: 'var(--gray-400)', letterSpacing: '0.5px' }}>{projeto.nome}</Link>
        <span style={{ color: 'var(--gray-200)', fontSize: '11px' }}>→</span>
        <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--black)' }}>Key Insights</span>
      </div>

      {/* HERO */}
      <div style={{ padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0', borderBottom: '2px solid var(--black)' }}>
        {/* Tag com ponto coral */}
        <div style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--coral)', flexShrink: 0 }}></div>
          Key Insights
        </div>
        <div style={{ fontSize: 'clamp(36px,8vw,96px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 0.92, textTransform: 'uppercase' }}>
          {insights.length} Insights
        </div>
        <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', marginTop: '20px', lineHeight: 1.7, paddingBottom: 'clamp(24px,4vw,48px)' }}>
          Achados principais da pesquisa de campo — observações, razões e implicações para o design.
        </div>
      </div>

      {/* INSIGHTS EMPILHADOS */}
      {insights.length === 0 ? (
        <div style={{ padding: 'clamp(32px,4vw,64px) clamp(16px,3vw,48px)', fontSize: '13px', fontWeight: 300, color: 'var(--gray-400)' }}>
          Nenhum key insight gerado ainda.
        </div>
      ) : (
        <div>
          {insights.map((artefato: any) => {
            const dados = artefato.dados || {}
            return (
              <div key={artefato.slug} style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(100px,15vw,200px) 1fr',
                borderBottom: '1px solid var(--gray-200)',
                background: 'var(--soft-sand)',
              }}>
                {/* Coluna esquerda — coral */}
                <div style={{
                  background: 'var(--coral)',
                  padding: 'clamp(24px,4vw,40px) clamp(16px,3vw,32px)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{
                      fontSize: '9px', fontWeight: 700, letterSpacing: '3px',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
                      marginBottom: '16px',
                    }}>
                      Key Insight
                    </div>
                    <div style={{
                      fontSize: 'clamp(64px,10vw,120px)', fontWeight: 900,
                      lineHeight: 1, color: 'rgba(255,255,255,0.2)',
                      letterSpacing: '-4px',
                    }}>
                      {dados.numero || '—'}
                    </div>
                  </div>
                  <div style={{
                    width: '24px', height: '3px',
                    background: 'rgba(255,255,255,0.4)',
                    marginTop: '24px',
                  }}></div>
                </div>

                {/* Coluna direita — soft-sand */}
                <div style={{ padding: 'clamp(24px,4vw,48px)' }}>
                  <div style={{
                    fontSize: 'clamp(16px,2.5vw,24px)', fontWeight: 700,
                    textTransform: 'uppercase', color: 'var(--black)',
                    lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: '32px',
                  }}>
                    {dados.observacao || artefato.titulo}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {dados.cadeia && dados.cadeia.map((item: any, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <span style={{
                          fontSize: '9px', fontWeight: 700, letterSpacing: '2px',
                          textTransform: 'uppercase', color: 'var(--coral)',
                          padding: '4px 8px', border: '1px solid var(--coral)',
                          flexShrink: 0, marginTop: '2px',
                        }}>
                          {item.tag}
                        </span>
                        <span style={{
                          fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 300,
                          color: 'var(--gray-600)', lineHeight: 1.6,
                        }}>
                          {item.texto}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/artefatos/${artefato.slug}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    marginTop: '32px', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--gray-400)', textDecoration: 'none',
                  }}>
                    Ver insight individual →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
