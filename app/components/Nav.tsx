import Link from 'next/link'

export default function Nav() {
  return (
    <nav style={{
      width: '100%',
      background: 'var(--twilight-indigo)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(16px,3vw,48px)',
      height: '48px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--soft-sand)',
        backgroundColor: 'var(--coral)',
        height: '32px',
        width: '32px',
        padding: '10px 5px',
        borderRadius: '24px',
      }}>
        DM
      </Link>
      <div style={{ display: 'flex', gap: 'clamp(16px,3vw,40px)' }}>
        {['research','ideation','prototyping','facilitation'].map(fase => (
          <Link key={fase} href={`/metodos?fase=${fase}`} style={{
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--gray-200)',
          }}>
            {fase}
          </Link>
        ))}
      </div>
    </nav>
  )
}
