import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const DONUT_COLORS = ['#198cff', '#ff6b68', '#43da4b', '#616161']
const BAR_COLORS = ['#198cff', '#ff6b68', '#fddc4c', '#43da4b']

// Default data 
const DEFAULT_DEALER = [
  { year: '2015', claims: 128 }, { year: '2016', claims: 75 },
  { year: '2017', claims: 73 }, { year: '2018', claims: 135 },
  { year: '2019', claims: 132 }, { year: '2020', claims: 62 },
]
const DEFAULT_VIOLATION = [
  { name: 'Control Direction/Path', value: 165 },
  { name: 'Control Speed', value: 155 },
  { name: 'Loss of Propulsion', value: 250 },
  { name: 'Others', value: 300 },
]
const DEFAULT_MODEL = [
  { model: 'M1', Accelerating: 900, Slipping: 1400, Noise: 300, Others: 600 },
  { model: 'M2', Accelerating: 500, Slipping: 800, Noise: 200, Others: 400 },
  { model: 'M3', Accelerating: 700, Slipping: 1100, Noise: 400, Others: 350 },
  { model: 'M4', Accelerating: 300, Slipping: 1350, Noise: 150, Others: 700 },
]
const DEFAULT_TREND = [
  { year: '2015', ControlDir: 100, ControlSpd: 60, LossProp: 75 },
  { year: '2016', ControlDir: 95, ControlSpd: 125, LossProp: 95 },
  { year: '2017', ControlDir: 45, ControlSpd: 55, LossProp: 55 },
  { year: '2018', ControlDir: 82, ControlSpd: 70, LossProp: 80 },
  { year: '2019', ControlDir: 90, ControlSpd: 60, LossProp: 55 },
  { year: '2020', ControlDir: 42, ControlSpd: 130, LossProp: 80 },
]

const ttStyle = { fontSize: 12, borderRadius: 6, border: '1px solid #e0e0e0' }
const axisProps = { tick: { fontSize: 11 }, axisLine: false, tickLine: false }

// Chart 1: Dealer Bar Chart
export function DealerBarChart({ data = DEFAULT_DEALER }) {
  return (
    <div className="chart-card card-1">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Dealer-wise Claims</h3>
        <button className="chart-card__info-btn">i</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="year" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip contentStyle={ttStyle} />
          <Bar dataKey="claims" fill="#42a5f5" radius={[3, 3, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Chart 2: Violation Donut Chart
export function ViolationDonutChart({ data = DEFAULT_VIOLATION }) {

  return (
    <div className="chart-card card-2">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Violation Categories — Count</h3>
        <button className="chart-card__info-btn">i</button>
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%"
            innerRadius={48} outerRadius={72}
            dataKey="value" paddingAngle={2}
          >
            {data.map((_, i) => <Cell key={i} fill={DONUT_COLORS[i]} />)}
          </Pie>
          <Tooltip contentStyle={ttStyle} />
        </PieChart>
      </ResponsiveContainer>

      <div className="chart-legend">
        {data.map((item, i) => (
          <div key={item.name} className="chart-legend__item">
            <span className="chart-legend__dot" style={{ background: DONUT_COLORS[i] }} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Chart 3: Model Grouped Bar Chart 
export function ModelBarChart({ data = DEFAULT_MODEL }) {
  const keys = ['Accelerating', 'Slipping', 'Noise', 'Others']
  return (
    <div className="chart-card card-2">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Model-wise Claims</h3>
        <button className="chart-card__info-btn">i</button>
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="model" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip contentStyle={ttStyle} />
          {keys.map((k, i) => (
            <Bar key={k} dataKey={k} fill={BAR_COLORS[i]} radius={[2, 2, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-legend model-wise-chart">
        {keys.map((k, i) => (
          <div key={k} className="chart-legend__item">
            <span className="chart-legend__square" style={{ background: BAR_COLORS[i] }} />
            <span>{k}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Chart 4: Violations Trend Line Chart
export function ViolationTrendChart({ data = DEFAULT_TREND }) {
  const lines = [
    { key: 'ControlDir', color: '#42a5f5', label: 'Control Direction/Path' },
    { key: 'ControlSpd', color: '#fdd835', label: 'Control Speed' },
    { key: 'LossProp', color: '#66bb6a', label: 'Loss of Propulsion' },
  ]
  return (
    <div className="chart-full">
      <div className="chart-full__header">
        <h3 className="chart-full__title">Violations Trend Over Time</h3>
        <div className="chart-full__legend">
          {lines.map(l => (
            <div key={l.key} className="chart-full__legend-item">
              <span className="chart-full__legend-line" style={{ background: l.color }} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip contentStyle={ttStyle} />
          {lines.map(l => (
            <Line key={l.key} type="monotone" dataKey={l.key}
              stroke={l.color} strokeWidth={2}
              dot={{ r: 4, fill: l.color }} activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
