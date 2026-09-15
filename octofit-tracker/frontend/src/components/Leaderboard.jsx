import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems('leaderboard').then(setLeaders).catch((loadError) => setError(loadError.message)) }, [])
  return <section><h1 className="h2 mb-3">Leaderboard</h1>{error && <div className="alert alert-warning">{error}</div>}<div className="table-responsive"><table className="table table-hover"><thead><tr><th>#</th><th>Athlete</th><th>Points</th><th>Activities</th></tr></thead><tbody>{leaders.map((leader, index) => <tr key={leader.user?._id || leader._id || index}><td>{index + 1}</td><td>{leader.user?.name || leader.name || 'Unknown athlete'}</td><td>{leader.points || 0}</td><td>{leader.activities || 0}</td></tr>)}</tbody></table></div></section>
}

export default Leaderboard