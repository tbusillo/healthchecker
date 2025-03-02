import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import { SWRHookResponse } from '../types'
import invalidTokenResponse from '../utils/invalid-token'
import { Json } from 'healthcheck-shared'

interface HealthchecksResponse {
  created_at: string
  updated_at: string
  expected_response: Json | null
  interval: number
  timout: number
  url: string
  name: string
  id: string
  status: 'active' | 'paused'
}

export function useHealthchecks(
  token: string | undefined
): SWRHookResponse<HealthchecksResponse[]> {
  const {
    data = null,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR<HealthchecksResponse[]>(
    token ? ['/healthchecks', token] : null,
    ([url, token]: string) => fetcher(url, token)
  )

  if (!token) {
    return invalidTokenResponse
  }

  return {
    data,
    loading: isLoading,
    validating: isValidating,
    mutate,
    error
  }
}
