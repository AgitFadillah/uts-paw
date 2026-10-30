import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const AWAL = { judul: '', kategori: 'Nasi', alamat: '', hargaRataRata: '', jamBuka: '' }

const KATEGORI = ['Nasi', 'Mi', 'Minuman', 'Jajanan']

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const simpan = (e) => {
    e.preventDefault()
    if (form.judul.trim().length < 3) {
      setGalat('Judul wajib diisi, minimal 3 karakter.')
      return
    }
    tambah({
      ...form,
      judul: form.judul.trim(),
      alamat: form.alamat.trim(),
      jamBuka: form.jamBuka.trim(),
      hargaRataRata: Number(form.hargaRataRata) || 0,
    })
    navigate('/koleksi')
  }

  return (
    <form className="formulir" id="form-tambah" onSubmit={simpan} noValidate>
      <h1>Tambah Tempat Makan</h1>

      <label htmlFor="judul">Judul</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        {KATEGORI.map((pilih) => (
          <option key={pilih}>{pilih}</option>
        ))}
      </select>

      <label htmlFor="alamat">Alamat</label>
      <input id="alamat" name="alamat" value={form.alamat} onChange={ubah} />

      <label htmlFor="hargaRataRata">Harga Rata-rata (Rp)</label>
      <input
        id="hargaRataRata"
        name="hargaRataRata"
        type="number"
        min="0"
        value={form.hargaRataRata}
        onChange={ubah}
      />

      <label htmlFor="jamBuka">Jam Buka</label>
      <input
        id="jamBuka"
        name="jamBuka"
        placeholder="10.00-21.00"
        value={form.jamBuka}
        onChange={ubah}
      />

      <button type="submit" className="tombol">
        Simpan
      </button>
    </form>
  )
}
