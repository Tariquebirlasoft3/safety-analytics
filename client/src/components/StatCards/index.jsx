
const DEFAULT_STATS = [
  { label: 'Total Amount Claimed', value: '120', yoy: '2%', qoq: '0.2%' },
  { label: 'Variants', value: '430', yoy: '5%', qoq: '1%' },
  { label: 'Dealers', value: '35', yoy: '15%', qoq: '0.1%' },
  { label: 'Units in Operation', value: '1.2M', yoy: '16%', qoq: '3%' },
  { label: 'Warranty Claims', value: '1259', yoy: '2%', qoq: '0.2%' },
  { label: 'Service Complaints', value: '1500', yoy: '1%', qoq: '0.6%' },
]

const DEFAULT_HIGHLIGHTS = [
  { label: 'Most occurring Violation Category', value: 'Speed Controlling', yoy: '12%', qoq: '1.2%' },
  { label: 'Model with Most Claims', value: 'Santa Fe', yoy: '3%', qoq: '0.1%' },
  { label: 'Part with Most Claims', value: 'Ignition', yoy: '10%', qoq: '2%' },
]

function SingleCard({ label, value, yoy, qoq }) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <div className="stat-card__flex-chip">
        <h3 className="stat-card__value">{value}</h3>
        <div className="stat-card__chips">
          <span className="stat-card__chip stat-card__chip--up">
            <span className="stat-card__yoy">{yoy}</span>▲<br /> <span className="stat-card__yoy-info">(YoY)</span>
          </span>
          <span className="stat-card__chip stat-card__chip--down">
            <span className="stat-card__yoy">{qoq}</span>▼<br /> <span className="stat-card__yoy-info">(QoQ)</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function StatCards({ stats = DEFAULT_STATS, highlights = DEFAULT_HIGHLIGHTS }) {
  return (
    <>
      <div className="stat-cards">
        {stats.map(s => <SingleCard key={s.label} {...s} />)}
      </div>

      <div className="highlight-row">

        <div className="highlight-row__inner">

          {highlights.map(item => (

            <div key={item.label} className="highlight-row__item">
              <p className="highlight-row__item-label">{item.label}</p>

              <div className="highlight-row__flex-chip">
                <h3 className="highlight-row__item-value">{item.value}</h3>

                <div className="highlight-row__item-chips">
                  <span className="stat-card__chip stat-card__chip--up">
                    <span className="stat-card__yoy">{item.yoy}</span>▲ <br /> <span className="stat-card__yoy-info">(YoY)</span>
                  </span>
                  <span className="stat-card__chip stat-card__chip--down">
                    <span className="stat-card__yoy">{item.qoq}</span>▼ <br /> <span className="stat-card__yoy-info">(QoQ)</span>

                  </span>
                </div>
              </div>

            </div>

          ))}

        </div>

      </div >
    </>
  )
}
