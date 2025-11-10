import React, { useEffect, useState } from 'react'
import { getTeams } from '../services/getTeams'

export default function Teams(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getTeams()
      .then(payload=>{
        console.log('Teams fetched raw data:', payload)
        setData(payload)
      })
      .catch(err=>{
        console.error('Teams fetch error', err)
        setData([])
      })
      .finally(()=>setLoading(false))
  }, [])

  if(loading) return <div className="p-3">Loading teams...</div>
  return (
    <div className="p-3">
      <h2>Teams</h2>
      {data && data.length === 0 && <div>No teams found.</div>}
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
