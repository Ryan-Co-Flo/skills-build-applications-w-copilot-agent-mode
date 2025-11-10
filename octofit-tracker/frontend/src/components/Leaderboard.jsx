import React, { useEffect, useState } from 'react'
import { getLeaderboards } from '../services/getLeaderboards'

export default function Leaderboard(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getLeaderboards()
      .then(payload=>{
        console.log('Leaderboard fetched raw data:', payload)

        setData(payload)
      })
      .catch(err=>{
        console.error('Leaderboard fetch error', err)
        setData([])
      })
      .finally(()=>setLoading(false))
  }, [])

  if(loading) return <div className="p-3">Loading leaderboards...</div>
  return (
    <div className="p-3">
      <h2>Leaderboards</h2>
      {data && data.length === 0 && <div>No leaderboards found.</div>}
      <ul className="list-group mt-2">
        {data && data.map((item, i)=> (
          <li key={i} className="list-group-item">
            <pre style={{margin:0}}>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  )
}
