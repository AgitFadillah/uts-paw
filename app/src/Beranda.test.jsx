import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { buka, koleksi, tirukanFetch } from './ujiBantu.jsx'

describe('Beranda', () => {
  test('menampilkan nama tema serta ringkasan item dan kategori', async () => {
    tirukanFetch()
    buka('/')
    const jumlahKategori = new Set(koleksi.map((it) => it.kategori)).size
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'Direktori Kuliner Sekitar Kampus',
    )
    expect(
      await screen.findByText(
        `Ada ${koleksi.length} tempat makan dalam ${jumlahKategori} kategori.`,
      ),
    ).toBeInTheDocument()
  })
})
