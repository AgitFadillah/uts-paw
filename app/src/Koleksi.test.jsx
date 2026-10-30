import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { buka, koleksi, tirukanFetch } from './ujiBantu.jsx'

describe('Koleksi', () => {
  test('pencarian judul menyaring daftar kartu', async () => {
    tirukanFetch()
    const user = buka('/koleksi')
    await screen.findByText(koleksi[0].judul)
    await user.type(screen.getByRole('searchbox'), 'Timun')
    expect(screen.queryByText(koleksi[0].judul)).not.toBeInTheDocument()
    expect(screen.getByText(koleksi[6].judul)).toBeInTheDocument()
    expect(screen.queryByText(koleksi[6].judul)).not.toBeNull()
  })

  test('koleksi yang tidak cocok menampilkan pesan kosong', async () => {
    tirukanFetch()
    const user = buka('/koleksi')
    await screen.findByText(koleksi[0].judul)
    await user.type(screen.getByRole('searchbox'), 'Wisata Goa')
    expect(await screen.findByText(/Tidak ada tempat yang cocok/)).toBeInTheDocument()
  })
})
