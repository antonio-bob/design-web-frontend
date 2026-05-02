'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="md-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 style={{
              fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '-1px',
              lineHeight: 1, marginTop: '48px', marginBottom: '24px',
              borderBottom: '2px solid var(--black)', paddingBottom: '16px',
            }}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 style={{
              fontSize: 'clamp(20px,3vw,32px)', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '-0.5px',
              marginTop: '40px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span>{children}</span>
              <span style={{ flex: 1, height: '1px', background: 'var(--gray-200)', display: 'block' }}></span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{
              fontSize: 'clamp(14px,2vw,18px)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.5px',
              marginTop: '32px', marginBottom: '12px',
              color: 'var(--gray-600)',
            }}>{children}</h3>
          ),
          p: ({ children }) => (
            <p style={{
              fontSize: 'clamp(13px,1.5vw,15px)', fontWeight: 300,
              lineHeight: 1.8, color: 'var(--gray-600)',
              marginBottom: '20px',
            }}>{children}</p>
          ),
          strong: ({ children }) => (
            <strong style={{ fontWeight: 500, color: 'var(--black)' }}>{children}</strong>
          ),
          ul: ({ children }) => (
            <ul style={{
              marginBottom: '20px', paddingLeft: '0',
              listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px',
            }}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol style={{
              marginBottom: '20px', paddingLeft: '0',
              listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px',
            }}>{children}</ol>
          ),
          li: ({ children }: any) => (
            <li style={{
              fontSize: 'clamp(13px,1.5vw,15px)', fontWeight: 300,
              lineHeight: 1.7, color: 'var(--gray-600)',
              display: 'flex', alignItems: 'flex-start', gap: '12px',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--gray-400)', flexShrink: 0, marginTop: '8px',
              }}></span>
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{
              borderLeft: '3px solid var(--black)',
              paddingLeft: '24px', margin: '32px 0',
              fontStyle: 'italic',
            }}>{children}</blockquote>
          ),
          code: ({ inline, children }: any) => inline ? (
            <code style={{
              fontSize: '12px', fontWeight: 500,
              background: 'var(--gray-100)', padding: '2px 6px',
              fontFamily: 'monospace',
            }}>{children}</code>
          ) : (
            <pre style={{
              background: 'var(--black)', color: 'var(--eggshell)',
              padding: '24px', overflowX: 'auto',
              fontSize: '12px', lineHeight: 1.7,
              fontFamily: 'monospace', marginBottom: '24px',
            }}>
              <code>{children}</code>
            </pre>
          ),
          table: ({ children }) => (
            <div style={{ width: '100%', overflowX: 'auto', marginBottom: '24px', borderBottom: '1px solid var(--gray-200)' }}>
              <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse' }}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead>{children}</thead>
          ),
          th: ({ children }) => (
            <th style={{
              padding: '14px 20px', fontSize: '9px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray-600)',
              textAlign: 'left', borderBottom: '2px solid var(--twilight-indigo)', whiteSpace: 'nowrap',
            }}>{children}</th>
          ),
          td: ({ children }) => (
            <td style={{
              padding: '14px 20px', fontSize: '13px', fontWeight: 300,
              color: 'var(--black)', verticalAlign: 'top',
              borderBottom: '1px solid var(--gray-200)',
            }}>{children}</td>
          ),
          img: ({ src, alt }) => (
            <figure style={{ margin: '32px 0' }}>
              <img src={src} alt={alt} style={{ width: '100%', display: 'block', borderBottom: '1px solid var(--gray-200)' }} />
              {alt && <figcaption style={{ fontSize: '11px', fontWeight: 300, color: 'var(--gray-400)', marginTop: '8px', fontStyle: 'italic' }}>{alt}</figcaption>}
            </figure>
          ),
          a: ({ href, children }) => (
            <a href={href} style={{ color: 'var(--black)', fontWeight: 500, borderBottom: '1px solid var(--black)', paddingBottom: '1px' }}>{children}</a>
          ),
          hr: () => (
            <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)', margin: '40px 0' }} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
