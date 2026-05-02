export default function Persona({ dados, titulo, criado_em, projeto_slug, metodo_origem, versao }: {
  dados: any; titulo: string; criado_em?: string;
  projeto_slug?: string; metodo_origem?: string; versao?: string
}) {
  const dataFormatada = criado_em
    ? new Date(criado_em).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : null

  return (
    <>
      <div style={{
        padding: 'clamp(32px,5vw,72px) clamp(16px,3vw,48px) 0',
        borderBottom: '2px solid var(--black)',
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: '24px', alignItems: 'end',
      }}>
        <div>
          <div style={{
            fontSize: '9px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--coral)' }}></div>
            Research · Persona
          </div>
          <div style={{
            fontSize: 'clamp(36px,8vw,96px)', fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 0.92,
          }}>
            {titulo}
          </div>
          {dados.subtitulo && (
            <div style={{ fontSize: 'clamp(13px,1.8vw,16px)', fontWeight: 300, color: 'var(--gray-600)', marginTop: '16px', lineHeight: 1.6 }}>
              {dados.subtitulo}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          {projeto_slug && (
            <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>
              Projeto<strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0, display: 'inline', marginLeft: '4px' }}>{projeto_slug}</strong>
            </span>
          )}
          {metodo_origem && (
            <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>
              Método<strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0, display: 'inline', marginLeft: '4px' }}>{metodo_origem}</strong>
            </span>
          )}
          {dataFormatada && (
            <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>
              Criado<strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0, display: 'inline', marginLeft: '4px' }}>{dataFormatada}</strong>
            </span>
          )}
          {versao && (
            <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', lineHeight: 2.2 }}>
              Versão<strong style={{ color: 'var(--black)', fontWeight: 500, fontSize: '12px', letterSpacing: 0, display: 'inline', marginLeft: '4px' }}>{versao}</strong>
            </span>
          )}
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'clamp(200px,25vw,300px) 1fr',
        borderBottom: '1px solid var(--gray-200)',
      }}>
        <div style={{
          background: 'var(--black)', padding: 'clamp(24px,4vw,40px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          minHeight: 'clamp(280px,40vw,420px)',
        }}>
          <div>
            <div style={{ fontSize: 'clamp(64px,10vw,120px)', fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.06)', letterSpacing: '-3px', marginBottom: '-12px' }}>01</div>
            <div style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, textTransform: 'uppercase', color: 'var(--white)', letterSpacing: '-1px', lineHeight: 0.95 }}>{titulo}</div>
            <div style={{ fontSize: '10px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', marginTop: '8px' }}>{dados.papel}</div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '28px' }}>
              {dados.meta && Object.entries(dados.meta).map(([k, v]: any) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '5px', gap: '8px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-400)', flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--white)', textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
            {dados.citacao && (
              <div style={{ fontSize: '12px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginTop: '20px', borderLeft: '3px solid var(--coral)', paddingLeft: '10px' }}>
                "{dados.citacao}"
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {dados.blocos && dados.blocos.map((bloco: any, i: number) => {
            const isOportunidade = bloco.label?.toLowerCase().includes('oportunidade')
            return (
              <div key={i} style={{
                padding: 'clamp(16px,3vw,28px)',
                borderBottom: '1px solid var(--gray-200)',
                borderRight: bloco.full ? 'none' : (i % 2 === 0 ? '1px solid var(--gray-200)' : 'none'),
                gridColumn: bloco.full ? '1/-1' : undefined,
              }}>
                <div style={{
                  fontSize: '9px', fontWeight: 700, letterSpacing: '3px',
                  textTransform: 'uppercase', color: 'var(--coral)', marginBottom: '12px',
                }}>{bloco.label}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {bloco.itens && bloco.itens.map((item: string, j: number) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{
                        width: '4px', height: '4px', borderRadius: '50%',
                        background: isOportunidade ? 'var(--coral)' : 'var(--black)',
                        marginTop: '7px', flexShrink: 0,
                      }}></div>
                      <span style={{ fontSize: 'clamp(11px,1.5vw,13px)', fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
