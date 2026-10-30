import { screen } from '@testing-library/react'
import { vi, describe, expect, test } from 'vitest'
import { buka, koleksi, tirukanFetch } from './ujiBantu.jsx'

describe('Detail', () => {
  test('id yang tidak ada menampilkan pesan tidak ditemukan', async () => {
    tirukanFetch()
    buka('/koleksi/id-tidak-pernah-ada')
    expect(
      await screen.findByRole('heading', { name: /tidak ditemukan/i }),
    ).toBeInTheDocument()
    expect(screen.queryAllByText(/\b404\b/)).toHaveLength(0)
    expect(screen.getByRole('link', { name: /kembali ke koleksi/i })).toBeInTheDocument()
  })

  test('tombol Hapus menghapus item lalu kembali ke koleksi', async () => {
    tirukanFetch()
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    const user = buka(`/koleksi/${koleksi[0].id}`)
    await screen.findByRole('heading', { name: koleksi[0].judul })
    await user.click(screen.getByRole('button', { name: /hapus/i }))
    expect(confirm).toHaveBeenCalled()
    await screen.findByRole('searchbox')
    expect(screen.queryByText(koleksi[0].judul)).not.toBeInTheDocument()
    expect(screen.getByText(koleksi[1].judul)).toBeInTheDocument()
  })
})
