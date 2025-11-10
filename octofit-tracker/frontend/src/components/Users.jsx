import React, { useEffect, useState } from 'react'

export default function Users(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getUsers()
      .then(payload=>{
        console.log('Users fetched raw data:', payload)
        setData(payload)
      })
      .catch(err=>{
        console.error('Users fetch error', err)
        setData([])
      })
      .finally(()=>setLoading(false))
  }, [])

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
