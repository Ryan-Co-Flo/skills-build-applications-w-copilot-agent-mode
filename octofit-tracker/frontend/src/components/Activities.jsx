import React, { useEffect, useState } from 'react';

import { getActivities } from '../services/getActivities';

export default function Activities(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getActivities()
      .then(payload=>{
        console.log('Activities fetched raw data:', payload)
        setData(payload)
      })
      .catch(err=>{
        console.error('Activities fetch error', err)
        setData([])
      })
      .finally(()=>setLoading(false))
  }, [])

  if(loading) return <div className="p-3">Loading activities...</div>;
  
  return (
    <div className="p-3">
      <h2>Activities</h2>
      {data && data.length === 0 && <div>No activities found.</div>}
      <ul className="list-group mt-2">
        {data && data.map((item, i)=> (
          <li key={i} className="list-group-item">
            <pre style={{margin:0}}>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
