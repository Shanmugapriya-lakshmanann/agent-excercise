import { useEffect, useState } from 'react'
import { apiBaseUrl, fetchItems } from '../api.js'

const activitiesEndpoint = `${apiBaseUrl}/api/activities/`

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems(activitiesEndpoint).then(setActivities).catch((loadError) => setError(loadError.message)) }, [])
  return <section><h1 className="h2 mb-3">Activities</h1>{error && <div className="alert alert-warning">{error}</div>}<div className="table-responsive"><table className="table table-hover"><thead><tr><th>Type</th><th>Duration</th><th>Points</th><th>Date</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || activity.id}><td className="text-capitalize">{activity.type}</td><td>{activity.duration} min</td><td>{activity.points}</td><td>{activity.date ? new Date(activity.date).toLocaleDateString() : '-'}</td></tr>)}</tbody></table></div></section>
}

export default Activities