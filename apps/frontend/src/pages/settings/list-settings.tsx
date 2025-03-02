import { Heading } from '../../components/catalyst/heading'
import { Divider } from '../../components/catalyst/divider'
import { useSessionContext } from '../../contexts/session'
import {
  UserSettingsResponse,
  useUserSettings
} from '../../hooks/use-user-settings'
import { Strong, Text } from '../../components/catalyst/text'
import { Input } from '../../components/catalyst/input'
import { createRef, useState } from 'react'
import { Button } from '../../components/catalyst/button'
import { Select } from '../../components/catalyst/select'
import fetcher from '../../utils/fetcher'
import { toast } from 'sonner'

export default function Auth() {
  const { session } = useSessionContext()
  const { data: settings, mutate } = useUserSettings(session?.access_token)

  const [submitting, setSubmitting] = useState(false)

  /* form refs */
  const email = createRef<HTMLInputElement>()
  const first_name = createRef<HTMLInputElement>()
  const last_name = createRef<HTMLInputElement>()
  const phone_number = createRef<HTMLInputElement>()
  const color_mode = createRef<HTMLSelectElement>()

  async function handleUpdateSettings(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const result = await fetcher<UserSettingsResponse>(
        '/user',
        session?.access_token,
        {
          method: 'PUT',
          body: JSON.stringify({
            first_name: first_name.current?.value,
            last_name: last_name.current?.value,
            email: email.current?.value,
            phone_number: phone_number.current?.value,
            color_mode: color_mode.current?.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      toast.success('User settings updated successfully')
      mutate(result)
    } catch (err) {
      console.error(err)
      toast.error('An error occurred while updating user settings')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Heading level={1}>User Settings</Heading>
      <Divider className="my-5 pb-3" />
      <form onSubmit={handleUpdateSettings}>
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Text>
              <Strong>Email</Strong>
            </Text>
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Email Address"
              ref={email}
              defaultValue={settings?.email}
            />
          </div>
          <div className="space-y-1">
            <Text>
              <Strong>Name</Strong>
            </Text>
          </div>
          <div className="flex gap-2 space-y-1">
            <Input
              type="text"
              placeholder="First name"
              ref={first_name}
              defaultValue={settings?.first_name}
            />
            <Input
              type="text"
              placeholder="Last name"
              ref={last_name}
              defaultValue={settings?.last_name}
            />
          </div>
          <div className="space-y-1">
            <Text>
              <Strong>Phone number</Strong>
            </Text>
          </div>
          <div className="space-y-1">
            <Input
              type="phone"
              placeholder="Phone number"
              ref={phone_number}
              defaultValue={settings?.phone_number}
            />
          </div>
          <div className="space-y-1">
            <Text>
              <Strong>Color mode</Strong>
            </Text>
          </div>
          <div className="space-y-1">
            <Select ref={color_mode} defaultValue={settings?.color_mode}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </div>
        </section>
        <Divider className="my-5" />
        <div className="flex justify-end gap-5">
          <Button color="light">Cancel</Button>
          <Button type="submit" disabled={submitting}>
            Update Settings
          </Button>
        </div>
      </form>
    </>
  )
}
