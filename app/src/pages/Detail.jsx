import { Link, useNavigate, useParams } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import DaftarRinci from '../components/DaftarRinci.jsx'

function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka ?? 0)
}

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items, loading, hapus } = useKoleksi()
  const item = items.find((it) => String(it.id) === id)

  if (loading) return <p>Memuat data...</p>

  if (!item) {
    return (
      <section>
        <h1>Tempat makan tidak ditemukan</h1>
        <Link to="/koleksi">Kembali ke koleksi</Link>
      </section>
    )
  }

  const konfirmasiHapus = () => {
    if (window.confirm(`Hapus "${item.judul}"?`)) {
      hapus(item.id)
      navigate('/koleksi')
    }
  }

  const rincian = [
    { label: 'Kategori', nilai: item.kategori },
    { label: 'Alamat', nilai: item.alamat },
    { label: 'Harga Rata-rata (Rp)', nilai: formatRupiah(item.hargaRataRata) },
    { label: 'Jam Buka', nilai: item.jamBuka },
    { label: 'Deskripsi', nilai: item.deskripsi ?? '-' },
  ]

  return (
    <section>
      <h1>{item.judul}</h1>
      <DaftarRinci entri={rincian} />
      <div className="aksi">
        <button type="button" className="tombol" onClick={konfirmasiHapus}>
          Hapus
        </button>
        <Link to="/koleksi">Kembali</Link>
      </div>
    </section>
  )
}
