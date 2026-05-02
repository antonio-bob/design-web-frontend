'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        DM
      </Link>

      {/* Desktop links */}
      <div className="nav-links">
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

      {/* Hamburger mobile */}
      <button
        className="nav-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {/* Mobile dropdown */}
      <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
        {['research','ideation','prototyping','facilitation'].map(fase => (
          <Link
            key={fase}
            href={`/metodos?fase=${fase}`}
            onClick={() => setOpen(false)}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--gray-200)',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {fase}
          </Link>
        ))}
      </div>
    </nav>
  )
}
