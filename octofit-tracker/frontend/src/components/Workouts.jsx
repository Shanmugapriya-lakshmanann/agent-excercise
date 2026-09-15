import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <section><h1 className="h2 mb-3">Workouts</h1>{error && <div className="alert alert-warning">{error}</div>}<div className="row g-3">{workouts.map((workout) => <article className="col-md-6" key={workout._id || workout.id || workout.name}><div className="border rounded p-3 h-100"><div className="d-flex justify-content-between gap-3"><h2 className="h5">{workout.name}</h2><span className="badge text-bg-light text-capitalize">{workout.difficulty}</span></div><p>{workout.description}</p><small className="text-secondary text-capitalize">{workout.type} · {workout.duration} min</small></div></article>)}</div></section>
}

export default Workouts