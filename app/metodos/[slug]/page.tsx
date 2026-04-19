import Nav from '../../components/Nav'
import Link from 'next/link'
import { getMetodo } from '../../lib/api'
import { notFound } from 'next/navigation'

const FASE_CORES: Record<string, string> = {
  research: 'var(--coral)',
  ideation: 'var(--blue)',
  prototyping: 'var(--green)',
  facilitation: 'var(--yellow)',
}

export default async function MetodoPage({ params }: { params: { slug: string } }) {
  const metodo = await getMetodo(params.slug)
  if (!metodo) notFound()

  const cor = FASE_CORES[metodo.fase] || 'var(--gray-400)'

  return (
    <>
      <Nav />

      {/* BREADCRUMB */}
      <div style={{ padding: '12px clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: 'var(--gray-400)' }}>
        <Link href="/">design.antoniobob.com</Link>
        <span style={{ color: 'var(--gray-200)' }}>→</span>
        <Link href={`/metodos?fase=${metodo.fase}`}>{metodo.fase}</Link>
        <span style={{ color: 'var(--gray-200)' }}>→</span>
        <span style={{ color: 'var(--black)', fontWeight: 500 }}>{metodo.nome}</span>
      </div>

      {/* HERO */}
      <div style={{ padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0', borderBottom: '2px solid var(--black)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor }}></div>
          {metodo.fase} · Método {metodo.numero}
        </div>
        <div style={{ fontSize: 'clamp(36px,8vw,80px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 0.92 }}>
          {metodo.nome}
        </div>
        <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', marginTop: '24px', maxWidth: '640px', lineHeight: 1.7 }}>
          {metodo.descricao}
        </div>

        {/* METADADOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', marginTop: '32px', borderTop: '1px solid var(--gray-200)' }}>
          {[
            { label: 'Duração', val: metodo.duracao },
            { label: 'Energia', val: metodo.energia },
            { label: 'Participantes', val: metodo.participantes },
            { label: 'Output', val: metodo.output },
            { label: 'Gera artefato', val: metodo.gera_artefato || '—' },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: '16px 0', borderRight: i < 4 ? '1px solid var(--gray-200)' : 'none', paddingRight: i < 4 ? '20px' : '0', paddingLeft: i > 0 ? '20px' : '0' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '12px', fontWeight: 400 }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px' }}>
        <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)', borderRight: '1px solid var(--gray-200)' }}>

          {/* PASSOS */}
          {metodo.passos && metodo.passos.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Passo a passo
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              {metodo.passos.map((passo: any, i: number) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', borderBottom: '1px solid var(--gray-100)', padding: '20px 0' }}>
                  <div style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, color: 'var(--gray-100)', lineHeight: 1, letterSpacing: '-1px' }}>0{i + 1}</div>
                  <div>
                    {passo.titulo && <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{passo.titulo}</div>}
                    <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.7 }}>{passo.texto || passo}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NOTAS */}
          {metodo.notas && metodo.notas.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Notas do método
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              {metodo.notas.map((nota: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ color: 'var(--gray-400)', flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6 }}>{nota}</span>
                </div>
              ))}
            </div>
          )}

          {/* VARIAÇÕES */}
          {metodo.variacoes && metodo.variacoes.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Variações
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              {metodo.variacoes.map((v: any, i: number) => (
                <div key={i} style={{ background: 'var(--gray-100)', padding: '24px', marginBottom: '16px' }}>
                  {v.titulo && <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>{v.titulo}</div>}
                  <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.7 }}>{v.texto || v}</div>
                </div>
              ))}
            </div>
          )}

          {/* NOTAS PESSOAIS */}
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Minhas notas de aplicação
              <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
            </div>
            <div style={{ border: '1px dashed var(--gray-200)', padding: '24px' }}>
              {metodo.notas_pessoais ? (
                <div style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7 }}>{metodo.notas_pessoais}</div>
              ) : (
                <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-200)', fontStyle: 'italic' }}>
                  Nenhuma nota ainda. As notas serão adicionadas após a aplicação do método em campo.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ padding: 'clamp(24px,3vw,40px) clamp(16px,3vw,32px)' }}>
          {metodo.materiais && metodo.materiais.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Materiais
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              {metodo.materiais.map((m: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--gray-400)' }}>—</span>
                  <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)' }}>{m}</span>
                </div>
              ))}
            </div>
          )}

          {metodo.gera_artefato && (
            <div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Artefato gerado
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ padding: '12px', border: '1px solid var(--gray-200)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor, marginBottom: '8px' }}></div>
                <div style={{ fontSize: '12px', fontWeight: 500 }}>{metodo.gera_artefato}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
