import Nav from '../../components/Nav'
import Link from 'next/link'
import { getArtefato } from '../../lib/api'
import { notFound } from 'next/navigation'
import Persona from '../../components/artefatos/Persona'
import JourneyMap from '../../components/artefatos/JourneyMap'
import KeyInsight from '../../components/artefatos/KeyInsight'
import HMW from '../../components/artefatos/HMW'
import SystemMap from '../../components/artefatos/SystemMap'
import JTBD from '../../components/artefatos/JTBD'
import UserStories from '../../components/artefatos/UserStories'
import ResearchReport from '../../components/artefatos/ResearchReport'

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

export default async function ArtefatoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artefato = await getArtefato(slug)
  if (!artefato) notFound()
  const cor = CORES[artefato.tipo] || 'var(--gray-400)'

  return (
    <>
      <Nav />

      {/* BREADCRUMB */}
      <div style={{ padding: '12px clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: 'var(--gray-400)' }}>
        <Link href="/" style={{ color: 'var(--gray-400)', textDecoration: 'none', letterSpacing: '0.5px' }}>Home</Link>
        <span style={{ color: 'var(--gray-200)' }}>→</span>
        {artefato.projeto_slug && (
          <>
            <Link href={`/projetos/${artefato.projeto_slug}`} style={{ color: 'var(--gray-400)', textDecoration: 'none', letterSpacing: '0.5px' }}>{artefato.projeto_slug}</Link>
            <span style={{ color: 'var(--gray-200)' }}>→</span>
          </>
        )}
        <span style={{ color: 'var(--black)', fontWeight: 500 }}>{artefato.titulo}</span>
      </div>

      {/* Persona tem hero próprio */}
      {artefato.tipo === 'persona' && (
        <Persona
          dados={artefato.dados}
          titulo={artefato.titulo}
          criado_em={artefato.criado_em}
          projeto_slug={artefato.projeto_slug}
          metodo_origem={artefato.metodo_origem}
          versao={artefato.versao}
        />
      )}

      {/* Todos os outros usam o hero padrão */}
      {artefato.tipo !== 'persona' && (
        <div style={{
          padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0',
          borderBottom: '2px solid var(--black)',
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: '24px', alignItems: 'end',
        }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor }}></div>
              {artefato.tipo.replace(/_/g, ' ')}
            </div>
            <div style={{ fontSize: 'clamp(36px,8vw,96px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 0.92 }}>{artefato.titulo}</div>
            {artefato.subtitulo && <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', marginTop: '16px', lineHeight: 1.6 }}>{artefato.subtitulo}</div>}
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            {artefato.projeto_slug && <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>Projeto<strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0, marginLeft: '4px' }}>{artefato.projeto_slug}</strong></span>}
            {artefato.metodo_origem && <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>Método<strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0, marginLeft: '4px' }}>{artefato.metodo_origem}</strong></span>}
            {artefato.criado_em && <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>Criado<strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0, marginLeft: '4px' }}>{new Date(artefato.criado_em).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</strong></span>}
            <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>Versão<strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0, marginLeft: '4px' }}>{artefato.versao}</strong></span>
          </div>
        </div>
      )}

      {artefato.tipo === 'journey_map' && <JourneyMap dados={artefato.dados} />}
      {artefato.tipo === 'future_journey_map' && <JourneyMap dados={artefato.dados} futuro={true} />}
      {artefato.tipo === 'system_map' && <SystemMap dados={artefato.dados} />}
      {artefato.tipo === 'hmw' && <HMW dados={artefato.dados} />}
      {artefato.tipo === 'key_insight' && <KeyInsight dados={artefato.dados} />}
      {artefato.tipo === 'jtbd' && <JTBD dados={artefato.dados} />}
      {artefato.tipo === 'user_stories' && <UserStories dados={artefato.dados} />}
      {artefato.tipo === 'research_report' && <ResearchReport dados={artefato.dados} />}
    </>
  )
}
