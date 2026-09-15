const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['results', 'data', 'items']) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  return []
}

export async function fetchItems(resource) {
  const response = await fetch(`${apiBaseUrl}/api/${resource}/`)
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return getItems(await response.json())
}