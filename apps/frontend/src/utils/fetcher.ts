const BASE_URL = import.meta.env.VITE_BACKEND_URL

interface FetcherError extends Error {
  info: Record<string, unknown>
  status: number
}

export default async function fetcher<T>(
  input: string,
  token?: string,
  init: RequestInit = {
    method: 'GET',
    headers: { 'Content-type': 'application/json' }
  }
): Promise<T> {
  let { headers } = init

  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` }
  }

  const res = await fetch(BASE_URL + input, { ...init, headers })

  if (!res.ok) {
    const error = new Error(
      'An error occured while fetching the data'
    ) as FetcherError
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}
