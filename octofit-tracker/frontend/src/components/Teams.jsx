import { useEffect, useState } from 'react'
import { fetchItems, getApiEndpoint } from '../api.js'

const teamsEndpoint = getApiEndpoint('teams')

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems(teamsEndpoint).then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <section><h1 className="h2 mb-3">Teams</h1>{error && <div className="alert alert-warning">{error}</div>}<div className="row g-3">{teams.map((team) => <article className="col-md-6 col-xl-4" key={team._id || team.id || team.name}><div className="border rounded p-3 h-100"><h2 className="h5">{team.name}</h2><p className="text-secondary mb-0">{team.members?.length || 0} members</p></div></article>)}</div></section>
}

export default Teams