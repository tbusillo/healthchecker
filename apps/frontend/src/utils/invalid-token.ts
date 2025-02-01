export default {
  data: null,
  loading: false,
  validating: false,
  mutate: () => Promise.resolve(undefined),
  error: { message: 'Auth token must be provided' } as Error,
  abortController: null
}
