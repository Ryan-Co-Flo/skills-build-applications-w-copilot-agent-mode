export async function getTeams(){
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    throw new Error("VITE_API_URL is not defined");
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/teams/`);

  if (!res.ok) 
    throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  
  return Array.isArray(json) ? json : (json.results || json);
}
