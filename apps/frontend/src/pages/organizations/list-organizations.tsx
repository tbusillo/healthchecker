import { Heading } from '../../components/catalyst/heading'
import { Strong, Text } from '../../components/catalyst/text'
import { Divider } from '../../components/catalyst/divider'
import { useSessionContext } from '../../contexts/session'
import { useOrganizations } from '../../hooks/use-organizations'

export default function Auth() {
  const { session } = useSessionContext()
  const { data: organizations } = useOrganizations(session?.access_token)
  console.log(organizations)
  return (
    <>
      <Heading level={1}>Organizations</Heading>
      <Divider className="my-5 pb-3" />
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {organizations?.map((organization) => (
          <div key={organization.organizations.id}>
            <Text>
              <Strong>{organization.organizations.name}</Strong>
            </Text>
          </div>
        ))}
      </section>
    </>
  )
}
