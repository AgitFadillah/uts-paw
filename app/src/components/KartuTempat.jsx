import { Link } from 'react-router-dom'

function formatAngka(angka) {
  return new Intl.NumberFormat('id-ID').format(angka ?? 0)
}

export default function KartuTempat({ item }) {
  const { id, judul, kategori, alamat, hargaRataRata, jamBuka } = item
  return (
    <article className="kartu">
      <h3 className="kartu-judul">
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      <p>
        <span className="label-kategori">{kategori}</span> ·{' '}
        <strong className="tag-harga">{formatAngka(hargaRataRata)}</strong> · jam {jamBuka}
      </p>
      <p className="kartu-alamat">{alamat}</p>
    </article>
  )
}
