import Nav from '../../components/Nav'
import Link from 'next/link'
import { getArtefato } from '../../lib/api'
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

function Persona({ dados, titulo }: { dados: any; titulo: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'clamp(200px,25vw,300px) 1fr', borderBottom: '1px solid var(--gray-200)' }}>
      <div style={{ background: 'var(--black)', padding: 'clamp(24px,4vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'clamp(280px,40vw,420px)' }}>
        <div>
          <div style={{ fontSize: 'clamp(64px,10vw,120px)', fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.06)', letterSpacing: '-3px', marginBottom: '-12px' }}>01</div>
          <div style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: '-1px', lineHeight: 0.95 }}>{titulo}</div>
          <div style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginTop: '8px' }}>{dados.papel}</div>
        </div>
        <div>
          {dados.meta && Object.entries(dados.meta).map(([k, v]: any) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5px', marginTop: '5px', gap: '8px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 400, color: 'white', textAlign: 'right' }}>{v}</span>
            </div>
          ))}
          {dados.citacao && (
            <div style={{ fontSize: '12px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginTop: '20px', borderLeft: '3px solid var(--coral)', paddingLeft: '10px' }}>
              "{dados.citacao}"
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {dados.blocos && dados.blocos.map((bloco: any, i: number) => (
          <div key={i} style={{ padding: 'clamp(16px,3vw,28px)', borderBottom: '1px solid var(--gray-200)', borderRight: i % 2 === 0 ? '1px solid var(--gray-200)' : 'none', gridColumn: bloco.full ? '1/-1' : undefined }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '12px' }}>{bloco.label}</div>
            {bloco.itens && bloco.itens.map((item: string, j: number) => (
              <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '7px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--black)', marginTop: '7px', flexShrink: 0 }}></div>
                <span style={{ fontSize: 'clamp(11px,1.5vw,13px)', fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function JourneyMap({ dados, futuro }: { dados: any; futuro?: boolean }) {
  const headerBg = futuro ? 'var(--blue)' : 'var(--black)'
  const stageBg = futuro ? 'rgba(74,127,212,0.08)' : 'var(--black)'
  const stageColor = futuro ? 'var(--blue)' : 'white'
  const stageNum = futuro ? 'rgba(74,127,212,0.2)' : 'rgba(255,255,255,0.08)'

  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)', overflowX: 'auto' }}>
      <div style={{ background: headerBg, padding: 'clamp(20px,3vw,32px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
        <div>
          {futuro && <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Future State</div>}
          <div style={{ fontSize: 'clamp(24px,5vw,44px)', fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: '-1px', lineHeight: 1 }}>{dados.titulo || 'Journey Map'}</div>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(16px,3vw,40px)', flexWrap: 'wrap' }}>
          {dados.meta && Object.entries(dados.meta).map(([k, v]: any) => (
            <div key={k}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'block' }}>{k}</span>
              <span style={{ fontSize: '12px', fontWeight: 400, color: 'white' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ background: stageBg, padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', textAlign: 'left', width: '110px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>Etapas</span>
            </th>
            {dados.etapas && dados.etapas.map((e: any, i: number) => (
              <th key={i} style={{ background: stageBg, padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', textAlign: 'left' }}>
                <span style={{ fontSize: '28px', fontWeight: 900, color: stageNum, lineHeight: 1, display: 'block', letterSpacing: '-1px' }}>0{i + 1}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: stageColor, display: 'block', marginTop: '2px' }}>{e.nome}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.linhas && dados.linhas.map((linha: any, i: number) => (
            <tr key={i}>
              <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--gray-200)', background: linha.tipo === 'emocao' ? stageBg : 'transparent' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>{linha.label}</span>
              </td>
              {linha.celulas && linha.celulas.map((cel: string, j: number) => (
                <td key={j} style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--gray-200)',
                  fontStyle: linha.tipo === 'pensamento' ? 'italic' : 'normal',
                  color: linha.tipo === 'oportunidade' ? 'var(--blue)' : linha.tipo === 'pensamento' ? 'var(--gray-600)' : 'var(--black)',
                  background: linha.tipo === 'emocao' ? stageBg : 'transparent',
                  textAlign: linha.tipo === 'emocao' ? 'center' : 'left',
                  fontSize: linha.tipo === 'emocao' ? '20px' : '12px',
                  fontWeight: linha.tipo === 'oportunidade' ? 500 : 300,
                  lineHeight: 1.5,
                }}>{cel}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SystemMap({ dados }: { dados: any }) {
  const atores = dados.atores || []
  const relacoes = dados.relacoes || []
  const total = atores.length
  const r = total > 6 ? 220 : 180
  const cx = (i: number) => 400 + r * Math.cos((2 * Math.PI * i) / (total - 1) - Math.PI / 2)
  const cy = (i: number) => 300 + r * Math.sin((2 * Math.PI * i) / (total - 1) - Math.PI / 2)

  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <div style={{ padding: 'clamp(24px,4vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Foco do mapa</div>
        <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6, maxWidth: '640px' }}>{dados.foco}</div>
      </div>
      <svg viewBox="0 0 800 600" style={{ width: '100%', maxWidth: '900px', display: 'block', margin: '0 auto' }}>
        {relacoes.map((rel: any, i: number) => {
          const fromIdx = atores.findIndex((a: any) => a.id === rel.de)
          const toIdx = atores.findIndex((a: any) => a.id === rel.para)
          if (fromIdx < 0 || toIdx < 0) return null
          const x1 = fromIdx === 0 ? 400 : cx(fromIdx)
          const y1 = fromIdx === 0 ? 300 : cy(fromIdx)
          const x2 = toIdx === 0 ? 400 : cx(toIdx)
          const y2 = toIdx === 0 ? 300 : cy(toIdx)
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gray-200)" strokeWidth="1.5" />
              {rel.label && (
                <text x={(x1 + x2) / 2} y={(y1 + y2) / 2} textAnchor="middle" fontSize="9" fill="var(--gray-400)" fontFamily="DM Sans, sans-serif" fontWeight="600">{rel.label}</text>
              )}
            </g>
          )
        })}
        {atores.map((ator: any, i: number) => {
          const x = i === 0 ? 400 : cx(i)
          const y = i === 0 ? 300 : cy(i)
          const cor = ator.tipo === 'central' ? 'var(--black)' : ator.tipo === 'primario' ? 'var(--green)' : 'var(--gray-400)'
          const radius = ator.tipo === 'central' ? 40 : 28
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={radius} fill={cor} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize={ator.tipo === 'central' ? '11' : '10'} fill="white" fontFamily="DM Sans, sans-serif" fontWeight="700">
                {ator.nome.length > 12 ? ator.nome.substring(0, 10) + '…' : ator.nome}
              </text>
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--gray-200)' }}>
        {atores.map((ator: any, i: number) => (
          <div key={i} style={{ padding: 'clamp(16px,2vw,24px)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none', borderBottom: '1px solid var(--gray-200)' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px' }}>{ator.tipo}</div>
            <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>{ator.nome}</div>
            {ator.descricao && <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', marginTop: '4px', lineHeight: 1.5 }}>{ator.descricao}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function HMW({ dados }: { dados: any }) {
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(16px,3vw,40px)', padding: 'clamp(24px,4vw,48px)', borderBottom: '2px solid var(--black)', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 'clamp(64px,12vw,140px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-3px', flexShrink: 0 }}>HMW</div>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Insight de base</div>
          <div style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 300, color: 'var(--gray-600)', maxWidth: '560px', lineHeight: 1.6 }}>{dados.insight}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
        {dados.perguntas && dados.perguntas.map((p: any, i: number) => (
          <div key={i} style={{ padding: 'clamp(20px,3vw,32px)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none', borderBottom: '1px solid var(--gray-200)' }}>
            <div style={{ fontSize: 'clamp(40px,6vw,64px)', fontWeight: 900, color: 'var(--gray-100)', lineHeight: 1, marginBottom: '6px', letterSpacing: '-2px' }}>0{i + 1}</div>
            <div style={{ fontSize: 'clamp(14px,2vw,18px)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.2 }}>{p.pergunta}</div>
            {p.sub && <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', marginTop: '8px', lineHeight: 1.5 }}>{p.sub}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function KeyInsight({ dados }: { dados: any }) {
  return (
    <div style={{ background: 'var(--black)', display: 'grid', gridTemplateColumns: 'clamp(120px,15vw,220px) 1px 1fr' }}>
      <div style={{ padding: 'clamp(24px,4vw,48px)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: '16px' }}>Key Insight</div>
        <div style={{ fontSize: 'clamp(80px,14vw,160px)', fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.05)', letterSpacing: '-4px' }}>{dados.numero || '01'}</div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.07)' }}></div>
      <div style={{ padding: 'clamp(24px,4vw,48px)' }}>
        <div style={{ fontSize: 'clamp(18px,3vw,28px)', fontWeight: 700, textTransform: 'uppercase', color: 'white', lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: '32px' }}>{dados.observacao}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {dados.cadeia && dados.cadeia.map((item: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--yellow)', padding: '4px 8px', border: '1px solid var(--yellow)', flexShrink: 0, marginTop: '2px' }}>{item.tag}</span>
              <span style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JTBD({ dados }: { dados: any }) {
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <div style={{ padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '24px' }}>Job-to-be-Done</div>
        <div style={{ fontSize: 'clamp(13px,1.8vw,18px)', fontWeight: 300, lineHeight: 1.8, maxWidth: '720px' }}>
          <span style={{ fontWeight: 700 }}>When </span>
          <span style={{ borderBottom: '2px solid var(--coral)', paddingBottom: '2px' }}>{dados.situacao}</span>
          <span style={{ fontWeight: 700 }}>, I want to </span>
          <span style={{ borderBottom: '2px solid var(--coral)', paddingBottom: '2px' }}>{dados.motivacao}</span>
          <span style={{ fontWeight: 700 }}>, so I can </span>
          <span style={{ borderBottom: '2px solid var(--coral)', paddingBottom: '2px' }}>{dados.resultado}</span>.
        </div>
      </div>
      {dados.jobs && dados.jobs.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {dados.jobs.map((job: any, i: number) => (
            <div key={i} style={{ padding: 'clamp(20px,3vw,32px)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none', borderBottom: '1px solid var(--gray-200)' }}>
              <div style={{ fontSize: 'clamp(40px,6vw,56px)', fontWeight: 900, color: 'var(--gray-100)', lineHeight: 1, marginBottom: '12px', letterSpacing: '-2px' }}>0{i + 1}</div>
              <div style={{ fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 300, lineHeight: 1.7 }}>
                <span style={{ fontWeight: 600 }}>When </span>{job.situacao}
                <span style={{ fontWeight: 600 }}>, I want to </span>{job.motivacao}
                <span style={{ fontWeight: 600 }}>, so I can </span>{job.resultado}.
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function UserStories({ dados }: { dados: any }) {
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      {dados.stories && dados.stories.map((story: any, i: number) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
            <span style={{ fontSize: 'clamp(24px,4vw,48px)', fontWeight: 900, color: 'rgba(255,255,255,0.1)', letterSpacing: '-2px' }}>0{i + 1}</span>
          </div>
          <div style={{ padding: 'clamp(20px,3vw,40px)' }}>
            <div style={{ fontSize: 'clamp(13px,1.8vw,18px)', fontWeight: 300, lineHeight: 1.8 }}>
              <span style={{ fontWeight: 700 }}>As a </span>
              <span style={{ borderBottom: '2px solid var(--blue)', paddingBottom: '2px' }}>{story.usuario}</span>
              <span style={{ fontWeight: 700 }}>, I want </span>
              <span style={{ borderBottom: '2px solid var(--blue)', paddingBottom: '2px' }}>{story.acao}</span>
              <span style={{ fontWeight: 700 }}>, so that </span>
              <span style={{ borderBottom: '2px solid var(--blue)', paddingBottom: '2px' }}>{story.resultado}</span>.
            </div>
            {story.criterios && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '8px' }}>Critérios de aceitação</div>
                {story.criterios.map((c: string, j: number) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '6px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--blue)', marginTop: '7px', flexShrink: 0 }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.5, color: 'var(--gray-600)' }}>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function ResearchReport({ dados }: { dados: any }) {
  return (
    <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)', borderRight: '1px solid var(--gray-200)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px' }}>Processo de Pesquisa</div>
          {dados.processo && dados.processo.map((p: any, i: number) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', marginBottom: '20px' }}>
              <div style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 900, color: 'var(--gray-100)', lineHeight: 1, letterSpacing: '-1px' }}>0{i + 1}</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{p.etapa}</div>
                <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.5 }}>{p.descricao}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px' }}>Key Findings</div>
          {dados.findings && dados.findings.map((f: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--gray-100)' }}>
              <div style={{ fontSize: 'clamp(24px,3vw,32px)', fontWeight: 900, color: 'var(--gray-100)', lineHeight: 1, flexShrink: 0, letterSpacing: '-1px' }}>0{i + 1}</div>
              <div style={{ fontSize: 'clamp(13px,1.8vw,15px)', fontWeight: 400, lineHeight: 1.5 }}>{f}</div>
            </div>
          ))}
        </div>
      </div>
      {dados.dados_brutos && (
        <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px' }}>Dados Brutos</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {dados.dados_brutos.map((item: any, i: number) => (
              <div key={i} style={{ padding: 'clamp(16px,2vw,24px)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none', borderBottom: '1px solid var(--gray-200)' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '8px' }}>{item.tipo}</div>
                <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--gray-600)', lineHeight: 1.6, fontStyle: item.tipo === 'quote' ? 'italic' : 'normal' }}>{item.conteudo}</div>
                {item.fonte && <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--gray-400)', marginTop: '8px' }}>— {item.fonte}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {dados.visualizacoes && dados.visualizacoes.length > 0 && (
        <div style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,3vw,48px)' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '24px' }}>Visualizações</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {dados.visualizacoes.map((v: any, i: number) => (
              <Link key={i} href={`/artefatos/${v.slug}`} style={{ padding: 'clamp(16px,2vw,24px)', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--gray-200)' : 'none', borderBottom: '1px solid var(--gray-200)', display: 'block' }}>
                <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: CORES[v.tipo] || 'var(--gray-400)', marginBottom: '12px' }}></div>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '6px' }}>{v.tipo}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.3px' }}>{v.titulo}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default async function ArtefatoPage({ params }: { params: { slug: string } }) {
  const artefato = await getArtefato(params.slug)
  if (!artefato) notFound()
  const cor = CORES[artefato.tipo] || 'var(--gray-400)'

  return (
    <>
      <Nav />
      <div style={{ padding: '12px clamp(16px,3vw,48px)', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: 'var(--gray-400)' }}>
        <Link href="/">design.antoniobob.com</Link>
        <span style={{ color: 'var(--gray-200)' }}>→</span>
        {artefato.projeto_slug && (
          <>
            <Link href={`/projetos/${artefato.projeto_slug}`}>{artefato.projeto_slug}</Link>
            <span style={{ color: 'var(--gray-200)' }}>→</span>
          </>
        )}
        <span style={{ color: 'var(--black)', fontWeight: 500 }}>{artefato.titulo}</span>
      </div>
      <div style={{ padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0', borderBottom: '2px solid var(--black)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cor }}></div>
            {artefato.tipo.replace(/_/g, ' ')}
          </div>
          <div style={{ fontSize: 'clamp(36px,8vw,96px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 0.92 }}>{artefato.titulo}</div>
          {artefato.subtitulo && (
            <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', marginTop: '16px', lineHeight: 1.6 }}>{artefato.subtitulo}</div>
          )}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          {artefato.projeto_slug && <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>Projeto <strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0 }}>{artefato.projeto_slug}</strong></span>}
          {artefato.metodo_origem && <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>Método <strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0 }}>{artefato.metodo_origem}</strong></span>}
          <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>Versão <strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0 }}>{artefato.versao}</strong></span>
        </div>
      </div>
      {artefato.tipo === 'persona' && <Persona dados={artefato.dados} titulo={artefato.titulo} />}
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
