export default function PilihKategori({ pilihan, nilai, ubah, aria }) {
  return (
    <select aria-label={aria} value={nilai} onChange={(e) => ubah(e.target.value)}>
      {pilihan.map((pilih) => (
        <option key={pilih} value={pilih}>
          {pilih}
        </option>
      ))}
    </select>
  )
}
