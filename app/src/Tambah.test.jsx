import { screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { buka, tirukanFetch } from './ujiBantu.jsx'

describe('Tambah', () => {
  test('menolak judul kosong dengan pesan galat', async () => {
    tirukanFetch()
    const user = buka('/tambah')
    const simpan = await screen.findByRole('button', { name: /simpan/i })
    await user.click(simpan)
    expect(await screen.findByRole('alert')).toHaveTextContent(/Judul wajib diisi/i)
    expect(screen.getByLabelText('Judul')).toBeInTheDocument()
  })

  test('menyimpan item baru ke localStorage lalu tampil di koleksi', async () => {
    tirukanFetch()
    const user = buka('/tambah')
    const judul = 'Ayam Bakar Wambon 88'
    await user.type(await screen.findByLabelText('Judul'), judul)
    await user.click(screen.getByRole('button', { name: /simpan/i }))
    await waitFor(() => expect(screen.getByRole('searchbox')).toBeInTheDocument())
    const isi = JSON.parse(localStorage.getItem('uts-paw:k7'))
    expect(isi.some((it) => it.judul === judul)).toBe(true)
    expect(screen.getByText(judul)).toBeInTheDocument()
  })
})
