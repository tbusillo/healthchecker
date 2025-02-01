import type { KeyedMutator } from 'swr'

export type DefaultProps = {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

export type SWRHookResponse<T> = {
  data: T | null
  error: Error | null
  validating: boolean
  mutate: KeyedMutator<T>
  loading: boolean
  abortController?: AbortController | null
}
