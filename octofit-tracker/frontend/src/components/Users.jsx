import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems('users').then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return <ResourceTable title="Users" error={error}>
    <thead><tr><th>Name</th><th>Email</th><th>Fitness level</th></tr></thead>
    <tbody>{users.map((user) => <tr key={user._id || user.id || user.email}><td>{user.name}</td><td>{user.email}</td><td>{user.fitnessLevel}</td></tr>)}</tbody>
  </ResourceTable>
}

function ResourceTable({ title, error, children }) {
  return <section><div className="d-flex justify-content-between align-items-center mb-3"><h1 className="h2 mb-0">{title}</h1><span className="text-secondary">OctoFit community</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="table-responsive"><table className="table table-hover align-middle">{children}</table></div></section>
}

export default Users