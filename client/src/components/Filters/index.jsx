import { useState } from 'react'

const OPTIONS = {
  Make: ['Make', 'Hyundai', 'Kia', 'Genesis'],
  Model: ['Model', 'Santa Fe', 'Tucson', 'Creta', 'Venue'],
  Variants: ['Variants', 'Petrol', 'Diesel', 'Hybrid'],
  Year: ['Year', '2020', '2019', '2018', '2017', '2016', '2015'],
}

export default function Filters({ onFilter }) {
  const [selected, setSelected] = useState(
    Object.fromEntries(Object.keys(OPTIONS).map(k => [k, 'All']))
  )

  const handleChange = (name, value) =>
    setSelected(prev => ({ ...prev, [name]: value }))

  return (
    <div className="filters">
      <div className="filters__row">
        {Object.entries(OPTIONS).map(([name, opts]) => (
          <select
            key={name}
            className="filters__select"
            value={selected[name]}
            onChange={e => handleChange(name, e.target.value)}
          >
            <option value="" disabled>{name}</option>
            {opts.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        <button className="filters__btn-go" onClick={() => onFilter?.(selected)}>GO</button>
        <button className="filters__btn-more">MORE FILTERS</button>
      </div>
    </div>
  )
}
