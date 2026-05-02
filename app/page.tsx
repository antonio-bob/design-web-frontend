import Nav from './components/Nav'
import Link from 'next/link'
import { getProjetos, getArtefatos } from './lib/api'

const FASES = [
  { num: '01', nome: 'Research', slug: 'research', cor: 'var(--coral)', desc: 'Challenge your assumptions; understand people and context.', count: '22 métodos' },
  { num: '02', nome: 'Ideation', slug: 'ideation', cor: 'var(--blue)', desc: 'Create, filter and select ideas.', count: '16 métodos' },
  { num: '03', nome: 'Prototyping', slug: 'prototyping', cor: 'var(--green)', desc: 'Explore, challenge, and evolve your ideas in reality.', count: '14 métodos' },
  { num: '04', nome: 'Facilitation', slug: 'facilitation', cor: 'var(--yellow)', desc: 'Keep workshops engaging, relevant, and productive.', count: '4 métodos' },
]

export default async function Home() {
  const projetos = await getProjetos()
  const artefatos = await getArtefatos()

  return (
    <>
      <Nav />

      {/* HERO */}
      <div style={{ backgroundColor: 'var(--teal)', padding: 'clamp(48px,8vw,120px) clamp(16px,3vw,48px) 0', borderBottom: '2px solid var(--gray-100)' }}>
        <div style={{ color: 'var(--eggshell)', fontSize: 'clamp(48px,12vw,160px)', fontWeight: 900, lineHeight: 0.88, textTransform: 'uppercase', letterSpacing: '-3px' }}>
          DESIGN<br />MEMORY
        </div>
        <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-800)', marginTop: '24px', maxWidth: '560px', lineHeight: 1.6 }}>
          Base de conhecimento em Service Design. Métodos, artefatos e notas de aplicação organizados por fase do processo.
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: 'clamp(16px,2vw,24px) 0', borderTop: '1px solid var(--eggshell)', marginTop: '32px', flexWrap: 'wrap', gap: '16px' }}>
          {[
            { label: 'Fases', val: '4' },
            { label: 'Métodos', val: '56' },
            { label: 'Artefatos', val: artefatos.length.toString() },
            { label: 'Projetos', val: projetos.length.toString() },
            { label: 'Pesquisador', val: 'Antonio Farias · FAU USP' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--eggshell)', opacity: 0.7 }}>{item.label}</div>
              <div style={{ fontSize: '13px', fontWeight: 400, marginTop: '4px', color: 'var(--eggshell)' }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FASES */}
      <div className="fases-grid">
        {FASES.map((fase, i) => (
          <Link key={fase.slug} href={`/metodos?fase=${fase.slug}`} style={{
            padding: 'clamp(24px,4vw,48px)',
            borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none',
            borderBottom: '1px solid var(--gray-200)',
            display: 'block',
            transition: 'background .15s',
          }}>
            <div style={{ fontSize: 'clamp(40px,6vw,96px)', fontWeight: 900, lineHeight: 1, color: 'var(--gray-200)', letterSpacing: '-2px', marginBottom: '8px' }}>{fase.num}</div>
            <div style={{ width: '32px', height: '4px', borderRadius: '2px', background: fase.cor, marginBottom: '16px' }}></div>
            <div style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1 }}>{fase.nome}</div>
            <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6, marginTop: '12px' }}>{fase.desc}</div>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginTop: '24px' }}>{fase.count}</div>
          </Link>
        ))}
      </div>

      {/* PROJETOS */}
      {projetos.length > 0 && (
        <div style={{ borderTop: '2px solid var(--black)' }}>
          <div style={{ padding: 'clamp(16px,3vw,32px) clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--twilight-indigo)' }}>
            Projetos
          </div>
          <div className="projetos-grid">
            {projetos.map((p: any) => (
              <Link key={p.slug} href={`/projetos/${p.slug}`} style={{
                padding: 'clamp(20px,3vw,32px)',
                borderRight: '1px solid var(--gray-200)',
                borderBottom: '1px solid var(--gray-200)',
                display: 'block',
              }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '8px' }}>{p.status?.replace(/_/g,' ')}</div>
                <div style={{ fontSize: 'clamp(16px,2.5vw,22px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '8px' }}>{p.nome}</div>
                <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.5 }}>{p.descricao}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
