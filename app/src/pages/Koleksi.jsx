import { useState } from 'react'
import useKoleksi from '../hooks/useKoleksi.js'
import KotakPencarian from '../components/KotakPencarian.jsx'
import PilihKategori from '../components/PilihKategori.jsx'
import KartuTempat from '../components/KartuTempat.jsx'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('Semua')

  if (loading) return <p>Memuat data...</p>
  if (error) return <p role="alert">Gagal memuat: {error}</p>

  const daftarKategori = ['Semua', ...new Set(items.map((item) => item.kategori))]
  const tampil = items.filter(
    (item) =>
      item.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === 'Semua' || item.kategori === kategori),
  )

  return (
    <section>
      <h1>Koleksi</h1>
      <div id="alat-koleksi">
        <KotakPencarian nilai={cari} onUbah={setCari} />
        <PilihKategori pilihan={daftarKategori} nilai={kategori} ubah={setKategori} aria="Kategori" />
      </div>
      {tampil.length === 0 ? (
        <p>Tidak ada tempat yang cocok.</p>
      ) : (
        <div className="daftar-kartu">
          {tampil.map((item) => (
            <KartuTempat key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
