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

const ARTEFATO_CORES: Record<string, string> = {
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

export default async function MetodoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const metodo = await getMetodo(slug)
  if (!metodo) notFound()

  const cor = FASE_CORES[metodo.fase] || 'var(--gray-400)'

  return (
    <>
      <Nav />

      {/* BREADCRUMB */}
      <div style={{
        padding: '12px clamp(16px,3vw,48px)',
        borderBottom: '1px solid var(--gray-200)',
        display: 'flex', gap: '8px', alignItems: 'center',
      }}>
        <Link href="/" style={{ fontSize: '11px', fontWeight: 400, color: 'var(--gray-400)', textDecoration: 'none', letterSpacing: '0.5px' }}>design.antoniobob.com</Link>
        <span style={{ color: 'var(--gray-200)', fontSize: '11px' }}>→</span>
        <Link href={`/metodos?fase=${metodo.fase}`} style={{ fontSize: '11px', fontWeight: 400, color: 'var(--gray-400)', textDecoration: 'none', letterSpacing: '0.5px', textTransform: 'capitalize' }}>{metodo.fase}</Link>
        <span style={{ color: 'var(--gray-200)', fontSize: '11px' }}>→</span>
        <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--black)' }}>{metodo.nome}</span>
      </div>

      {/* METHOD HERO */}
      {/* method-hero: padding clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0, borderBottom 2px black */}
      <div style={{
        padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0',
        borderBottom: '2px solid var(--black)',
      }}>
        {/* method-phase-tag: 9px 700 letterSpacing 3px uppercase gray-400 mb 16px flex alignItems center gap 10px */}
        <div style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          {/* method-phase-dot: 8px circle */}
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor }}></div>
          {metodo.fase} · Método {metodo.numero}
        </div>

        {/* method-hero-num: clamp(96px,18vw,220px) 900 lineHeight 1 gray-100 letterSpacing -6px float right mt -16px ml 24px */}
        <div style={{
          fontSize: 'clamp(96px,18vw,220px)', fontWeight: 900,
          lineHeight: 1, color: 'var(--gray-100)', letterSpacing: '-6px',
          float: 'right', marginTop: '-16px', marginLeft: '24px',
        }}>
          {metodo.numero}
        </div>

        {/* method-hero-title: clamp(36px,8vw,96px) 900 uppercase letterSpacing -2px lineHeight 0.92 */}
        <div style={{
          fontSize: 'clamp(36px,8vw,96px)', fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 0.92,
        }}>
          {metodo.nome}
        </div>

        {/* method-hero-desc: clamp(13px,1.8vw,16px) 300 gray-600 lineHeight 1.7 maxWidth 640px mt 24px clear both */}
        <div style={{
          fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300,
          color: 'var(--gray-600)', lineHeight: 1.7, maxWidth: '640px',
          marginTop: '24px', clear: 'both',
        }}>
          {metodo.descricao}
        </div>

        {/* method-hero-footer: grid repeat(5,1fr) mt 32px borderTop 1px gray-200 */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5,1fr)',
          marginTop: '32px', borderTop: '1px solid var(--gray-200)',
        }}>
          {[
            { label: 'Duração', val: metodo.duracao },
            { label: 'Energia', val: metodo.energia },
            { label: 'Participantes', val: metodo.participantes },
            { label: 'Output', val: metodo.output },
            { label: 'Gera artefato', val: metodo.gera_artefato || '—' },
          ].map((item, i) => (
            /* method-meta-cell: padding 16px 0, borderRight 1px, pr 24px pl 0 */
            /* last: borderRight none, pr 0 pl 24px */
            <div key={item.label} style={{
              padding: '16px 0',
              borderRight: i < 4 ? '1px solid var(--gray-200)' : 'none',
              paddingRight: i < 4 ? '24px' : '0',
              paddingLeft: i > 0 ? '24px' : '0',
            }}>
              {/* method-meta-key: 9px 700 letterSpacing 2px uppercase gray-400 block mb 6px */}
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', display: 'block', marginBottom: '6px' }}>{item.label}</span>
              {/* method-meta-val: 12px 400 lineHeight 1.4 */}
              <div style={{ fontSize: '12px', fontWeight: 400, lineHeight: 1.4 }}>{item.val || '—'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* METHOD BODY: grid 1fr 320px, borderBottom 1px */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', borderBottom: '1px solid var(--gray-200)' }}>

        {/* METHOD MAIN: padding clamp(32px,4vw,56px) clamp(16px,3vw,48px), borderRight 1px */}
        <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)', borderRight: '1px solid var(--gray-200)' }}>

          {/* PASSO A PASSO */}
          {metodo.passos && Array.isArray(metodo.passos) && metodo.passos.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              {/* content-label: 9px 700 letterSpacing 3px uppercase gray-400 mb 24px flex gap 10px + line */}
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Passo a passo
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>

              {/* steps-list: flex col gap 0 */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {metodo.passos.map((passo: any, i: number) => (
                  /* step-item: grid 48px 1fr, borderBottom 1px gray-100, padding 20px 0 */
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '48px 1fr',
                    borderBottom: i < metodo.passos.length - 1 ? '1px solid var(--gray-100)' : 'none',
                    padding: '20px 0',
                  }}>
                    {/* step-num: clamp(32px,5vw,48px) 900 gray-100 lineHeight 1 letterSpacing -1px pt 2px */}
                    <div style={{ fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, color: 'var(--gray-100)', lineHeight: 1, letterSpacing: '-1px', paddingTop: '2px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      {/* step-title: 13px 700 uppercase letterSpacing 0.5px mb 8px */}
                      {passo.titulo && (
                        <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{passo.titulo}</div>
                      )}
                      {/* step-text: 13px 300 gray-600 lineHeight 1.7 */}
                      <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.7 }}>{passo.texto || passo.descricao || (typeof passo === 'string' ? passo : '')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VARIAÇÕES */}
          {metodo.variacoes && Array.isArray(metodo.variacoes) && metodo.variacoes.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              {metodo.variacoes.map((v: any, i: number) => (
                /* variation-box: gray-100 bg, padding 24px, mt 32px */
                <div key={i} style={{ background: 'var(--gray-100)', padding: '24px', marginTop: i === 0 ? '0' : '16px' }}>
                  {/* variation-title: 11px 700 letterSpacing 2px uppercase mb 12px */}
                  {v.titulo && <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>{v.titulo}</div>}
                  {/* variation-text: 13px 300 gray-600 lineHeight 1.7 */}
                  <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.7 }}>{v.texto || v}</div>
                </div>
              ))}
            </div>
          )}

          {/* NOTAS DO MÉTODO */}
          {metodo.notas && Array.isArray(metodo.notas) && metodo.notas.length > 0 && (
            <div style={{ marginBottom: '48px', marginTop: metodo.variacoes?.length ? '32px' : '0' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Notas do método
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              {/* notes-list: flex col gap 16px */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {metodo.notas.map((nota: string, i: number) => (
                  /* note-item: flex gap 12px alignItems flex-start */
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    {/* note-arrow: 14px gray-400 flexShrink 0 pt 1px */}
                    <span style={{ fontSize: '14px', color: 'var(--gray-400)', flexShrink: 0, paddingTop: '1px' }}>→</span>
                    {/* note-text: 12px 300 gray-600 lineHeight 1.6 */}
                    <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6 }}>{nota}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTAS PESSOAIS */}
          <div style={{ marginTop: '32px' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Minhas notas de aplicação
              <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
            </div>
            {/* personal-notes: border 1px dashed gray-200, padding 24px, mt 24px */}
            <div style={{ border: '1px dashed var(--gray-200)', padding: '24px' }}>
              {metodo.notas_pessoais ? (
                <div style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7 }}>{metodo.notas_pessoais}</div>
              ) : (
                <>
                  {/* personal-notes-label: 9px 700 letterSpacing 2px uppercase gray-400 mb 12px */}
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '12px' }}>Antonio Farias · FAU USP</div>
                  {/* personal-notes-empty: 12px 300 gray-200 italic */}
                  <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-200)', fontStyle: 'italic' }}>Nenhuma nota ainda. As notas serão adicionadas após a aplicação do método em campo.</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* METHOD SIDEBAR: padding clamp(24px,3vw,40px) clamp(16px,3vw,32px) */}
        <div style={{ padding: 'clamp(24px,3vw,40px) clamp(16px,3vw,32px)' }}>

          {/* MATERIAIS */}
          {metodo.materiais && Array.isArray(metodo.materiais) && metodo.materiais.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Materiais
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              {/* notes-list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {metodo.materiais.map((m: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '14px', color: 'var(--gray-400)', flexShrink: 0, paddingTop: '1px' }}>—</span>
                    <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6 }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ARTEFATO GERADO */}
          {metodo.gera_artefato && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Artefatos gerados
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              {/* artifact-links: flex col gap 8px mt 12px */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <Link href={`/artefatos?tipo=${metodo.gera_artefato}`} style={{
                  /* artifact-link: flex alignItems center gap 12px padding 12px border 1px gray-200 */
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px', border: '1px solid var(--gray-200)',
                  textDecoration: 'none', color: 'var(--black)',
                }}>
                  {/* artifact-link-dot: 8px circle */}
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ARTEFATO_CORES[metodo.gera_artefato] || cor, flexShrink: 0 }}></div>
                  {/* artifact-link-name: 12px 500 */}
                  <span style={{ fontSize: '12px', fontWeight: 500 }}>{metodo.gera_artefato.replace(/_/g, ' ')}</span>
                  {/* artifact-link-arrow: ml auto gray-400 14px */}
                  <span style={{ marginLeft: 'auto', color: 'var(--gray-400)', fontSize: '14px' }}>→</span>
                </Link>
              </div>
            </div>
          )}

          {/* MÉTODOS RELACIONADOS */}
          {metodo.relacionados && metodo.relacionados.length > 0 && (
            <div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Métodos relacionados
                <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                {metodo.relacionados.map((rel: any, i: number) => (
                  <Link key={i} href={`/metodos/${rel.slug}`} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px', border: '1px solid var(--gray-200)',
                    textDecoration: 'none', color: 'var(--black)',
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gray-400)', flexShrink: 0 }}></div>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{rel.nome}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--gray-400)', fontSize: '14px' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
