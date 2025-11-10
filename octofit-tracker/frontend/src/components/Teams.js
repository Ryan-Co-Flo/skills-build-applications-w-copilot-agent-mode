import React, { useEffect, useState } from 'react'
import { getTeams } from '../services/getTeams'

function renderTable(data){
  if(!data || data.length === 0) return null
  const keys = Object.keys(data[0])
  return (
    <div className="table-responsive card-table">
      <table className="table table-striped table-hover table-fixed mb-0">
        <thead className="table-light">
          <tr>{keys.map(k=> <th key={k}>{k}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i)=> (
            <tr key={i}>
              {keys.map(k=> (
                <td key={k} className="mono-pre">{typeof row[k] === 'object' ? JSON.stringify(row[k]) : String(row[k])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Teams(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    // -8000.app.github.dev/api/workouts/
    getTeams()
      .then(payload=>{
        setData(Array.isArray(payload) ? payload : [])
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
      <h2 className="h5">Teams</h2>
      <div className="mb-2 text-muted">Team rosters and stats</div>
      <div className="card">
        <div className="card-body p-2">
          {data.length === 0 ? <div className="p-2">No teams found.</div> : renderTable(data)}
        </div>
      </div>
    </div>
  )
}
