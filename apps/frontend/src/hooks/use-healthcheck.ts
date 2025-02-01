import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import { SWRHookResponse } from '../types'
import invalidTokenResponse from '../utils/invalid-token'

interface HealthcheckResponse {
  version: string
}

export function useHealthcheck(
  token: string | undefined
): SWRHookResponse<HealthcheckResponse> {
  const {
    data = null,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR<HealthcheckResponse>(
    token ? ['/healthcheck', token] : null,
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
