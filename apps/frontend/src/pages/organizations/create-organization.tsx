import { Heading } from '../../components/catalyst/heading'
import { Strong, Text } from '../../components/catalyst/text'
import { Input } from '../../components/catalyst/input'
import { Divider } from '../../components/catalyst/divider'
import { Button } from '../../components/catalyst/button'
import { createRef, useEffect, useState } from 'react'
import fetcher from '../../utils/fetcher'
import { useSessionContext } from '../../contexts/session'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useOrganizations } from '../../hooks/use-organizations'

export default function Auth() {
  const { session } = useSessionContext()
  const { data: organizations } = useOrganizations(session?.access_token)
  const [submitting, setSubmitting] = useState(false)
  const organizationName = createRef<HTMLInputElement>()
  const navigate = useNavigate()

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
      navigate('/organizations')
    } catch (err) {
      console.error(err)
      toast.error('An error occurred while creating the organization')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (organizations && organizations.length > 0) {
      navigate('/organizations')
    }
  }, [organizations, navigate])

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
