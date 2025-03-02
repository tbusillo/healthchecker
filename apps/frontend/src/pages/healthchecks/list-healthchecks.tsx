import { Heading } from '../../components/catalyst/heading'
import { Divider } from '../../components/catalyst/divider'
import { useSessionContext } from '../../contexts/session'
import { useHealthchecks } from '../../hooks/use-healthchecks'
import { Button } from '../../components/catalyst/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '../../components/catalyst/table'

export default function ListHealthchecks() {
  const { session } = useSessionContext()
  const { data: healthchecks } = useHealthchecks(session?.access_token)
  console.log(healthchecks)
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading level={1}>Healthchecks</Heading>
        <Button href="/healthchecks/create">Create healthcheck</Button>
      </div>
      <Table className="mt-3">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Interval</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {healthchecks?.map((healthcheck) => (
            <TableRow key={healthcheck.id}>
              <TableCell>{healthcheck.name}</TableCell>
              <TableCell>{healthcheck.url}</TableCell>
              <TableCell>{healthcheck.interval}</TableCell>
              <TableCell>{healthcheck.status}</TableCell>
              <TableCell className="flex space-x-2">
                <Button href={`/healthchecks/${healthcheck.id}/edit`}>
                  Edit
                </Button>
                <Button href={`/healthchecks/${healthcheck.id}/delete`}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
