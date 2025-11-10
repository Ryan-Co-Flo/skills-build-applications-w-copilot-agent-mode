import React, { useEffect, useState } from 'react'
import { getWorkouts } from '../services/getWorkouts'

export default function Workouts(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getWorkouts()
      .then(payload=>{
        console.log('Workouts fetched raw data:', payload)
        setData(payload)
      })
      .catch(err=>{
        console.error('Workouts fetch error', err)
        setData([])
      })
      .finally(()=>setLoading(false))
  }, [])

  if(loading) return <div className="p-3">Loading workouts...</div>
  return (
    <div className="p-3">
      <h2>Workouts</h2>
      {data && data.length === 0 && <div>No workouts found.</div>}
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
