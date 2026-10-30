import { screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { buka, koleksi, tirukanFetch } from './ujiBantu.jsx'

describe('Statistik', () => {
  test('tabel menampilkan jumlah per kategori dan total', async () => {
    tirukanFetch()
    buka('/statistik')
    const tabel = await screen.findByRole('table')
    const hitungan = koleksi.reduce((akum, { kategori }) => {
      akum.set(kategori, (akum.get(kategori) ?? 0) + 1)
      return akum
    }, new Map())
    for (const [kategori, angka] of hitungan.entries()) {
      const baris = within(tabel).getByRole('row', {
        name: new RegExp(`^${kategori}\\b`, 'i'),
      })
      expect(within(baris).getByText(String(angka))).toBeInTheDocument()
    }
    const totalBaris = within(tabel).getByRole('row', { name: /total/i })
    expect(within(totalBaris).getByText(String(koleksi.length))).toBeInTheDocument()
  })
})
