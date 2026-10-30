import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { buka, tirukanFetch } from './ujiBantu.jsx'

describe('Halaman 404', () => {
  test('rute tidak dikenal menampilkan 404 dan tautan ke beranda', async () => {
    tirukanFetch()
    buka('/halaman-tidak-ada-xyz')
    expect(await screen.findByText('404')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /kembali ke beranda/i })).toHaveAttribute('href', '/')
  })
})
