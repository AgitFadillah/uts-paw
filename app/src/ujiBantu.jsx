import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import App from './App.jsx'
import koleksi from '../public/data/koleksi.json'

export { koleksi }

// fetch disamakan dengan perilaku uji dosen: koleksi.json via Response, sisanya 404.
export function tirukanFetch(isi = koleksi, gagal = false) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url) => {
      if (!gagal && String(url).includes('koleksi.json')) {
        return new Response(JSON.stringify(isi), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response('Not found', { status: 404 })
    }),
  )
}

export function buka(path) {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
  return user
}
