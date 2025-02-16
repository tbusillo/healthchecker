import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import { SWRHookResponse } from '../types'
import invalidTokenResponse from '../utils/invalid-token'

export interface UserSettingsResponse {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  color_mode: 'system' | 'light' | 'dark'
}

export function useUserSettings(
  token: string | undefined
): SWRHookResponse<UserSettingsResponse> {
  const {
    data = null,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR<UserSettingsResponse>(
    token ? ['/user', token] : null,
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
