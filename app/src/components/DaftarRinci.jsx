import { Fragment } from 'react'

export default function DaftarRinci({ entri }) {
  return (
    <dl className="rincian">
      {entri.map(({ label, nilai }) => (
        <Fragment key={label}>
          <dt>{label}</dt>
          <dd>{nilai}</dd>
        </Fragment>
      ))}
    </dl>
  )
}
