import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import { SWRHookResponse } from '../types'
import invalidTokenResponse from '../utils/invalid-token'

interface OrganizationsResponse {
  version: string
}

export function useOrganizations(
  token: string | undefined
): SWRHookResponse<OrganizationsResponse> {
  const {
    data = null,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR<OrganizationsResponse>(
    token ? ['/organizations', token] : null,
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
