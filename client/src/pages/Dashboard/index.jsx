
import { useState, useEffect } from 'react'
import StatCards from '../../components/StatCards'
import Filters from '../../components/Filters'

import {
  DealerBarChart,
  ViolationDonutChart,
  ModelBarChart,
  ViolationTrendChart,
} from '../../components/Charts'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})


  useEffect(() => {
    document.title = 'Safety Analytics | Dashboard';
  }, []);


  // Fetch data when filters change
  useEffect(() => {
    const params = new URLSearchParams(filters).toString()
    const url = `/api/dashboard${params ? '?' + params : ''}`

    fetch(url)
      .then(r => r.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [filters]) // Add filters dependency

  // NEW: Handle filter change
  const handleFilter = (selectedFilters) => {
    console.log('Applying filters:', selectedFilters)
    setFilters(selectedFilters)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px', color: '#757575' }}>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <Filters onFilter={handleFilter} />

      <StatCards state={data?.stats} highlights={data?.highlights} />

      <div className="charts-row">
        <DealerBarChart data={data?.dealerClaim} />
        <ViolationDonutChart data={data?.violationCats} />
        <ModelBarChart data={data?.modelClaim} />
      </div>

      <ViolationTrendChart data={data?.trendData} />
    </div>
  )
}

