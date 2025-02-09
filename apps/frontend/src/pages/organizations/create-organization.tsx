import { Heading } from '../../components/catalyst/heading'
import { Strong, Text } from '../../components/catalyst/text'
import { Input } from '../../components/catalyst/input'
import { Divider } from '../../components/catalyst/divider'
import { Button } from '../../components/catalyst/button'
import { createRef, useState } from 'react'
import fetcher from '../../utils/fetcher'
import { useSessionContext } from '../../contexts/session'
import { toast } from 'sonner'

export default function Auth() {
  const { session } = useSessionContext()
  const [submitting, setSubmitting] = useState(false)
  const organizationName = createRef<HTMLInputElement>()

  async function handleCreateOrganization(e: React.FormEvent) {
    e.preventDefault()

    setSubmitting(true)

    try {
      await fetcher('/organizations', session?.access_token, {
        method: 'POST',
        body: JSON.stringify({
          name: organizationName.current?.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      toast.success('Organization created successfully')
    } catch (err) {
      console.error(err)
      toast.error('An error occurred while creating the organization')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Heading level={1}>Create Organization</Heading>
      <Divider className="my-5 pb-3" />
      <form onSubmit={handleCreateOrganization}>
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Text>
              <Strong>Organization Name</Strong>
            </Text>
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Organization Name"
              ref={organizationName}
            />
          </div>
        </section>
        <Divider className="my-5" />
        <div className="flex justify-end gap-5">
          <Button color="light">Cancel</Button>
          <Button type="submit" disabled={submitting}>
            Create Organization
          </Button>
        </div>
      </form>
    </>
  )
}
