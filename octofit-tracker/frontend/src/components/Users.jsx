import React, { useEffect, useState } from 'react'

function getBaseUrl(){
  const codespace = import.meta?.env?.VITE_CODESPACE_NAME || (typeof window !== 'undefined' && (window.VITE_CODESPACE_NAME || window.REACT_APP_CODESPACE_NAME)) || ''
  if(codespace){
    return `https://${codespace}-8000.app.github.dev`
  }
  const proto = window.location.protocol || 'http:'
  const host = window.location.hostname || 'localhost'
  return `${proto}//${host}:8000`
}

export default function Users(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const base = getBaseUrl()
  const endpoint = `${base}/api/users/`

  useEffect(()=>{
    console.log('Users endpoint:', endpoint)
    fetch(endpoint)
      .then(r=>{
        if(!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(json=>{
        console.log('Users fetched raw data:', json)
        const payload = Array.isArray(json) ? json : (json.results || json)
        setData(payload)
      })
      .catch(err=>{
        console.error('Users fetch error', err)
        setData([])
      })
      .finally(()=>setLoading(false))
  }, [endpoint])

  if(loading) return <div className="p-3">Loading users...</div>
  return (
    <div className="p-3">
      <h2>Users</h2>
      {data && data.length === 0 && <div>No users found.</div>}
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
