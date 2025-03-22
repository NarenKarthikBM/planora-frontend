import { Table, TableTd, TableTh, TableThead, TableTr, TableTbody, Text, Title, Group, Accordion, AccordionItem, AccordionControl, AccordionPanel, Stack, Badge, Button } from "@mantine/core";
import { EventDetails } from "@/lib/types/events";
import { getUserEvents } from "@/lib/data/events/events-list-by-user";
import Link from "next/link";

export default async function MyEventsPage() {
  const eventsList: { events: Array<{ details: EventDetails; attended: number; rsvped: number }> } = await getUserEvents();
  console.log(eventsList);

  const items = eventsList.events.map((item: { details: EventDetails; attended: number; rsvped: number }) => (
    <AccordionItem key={item.details.id} value={item.details.id.toString()}>
      <AccordionControl>
        <Group>
          <Text fw={600}>{item.details.name}</Text>
          <Badge color={item.details.status == "draft" ? "blue" : "green"} variant="light">
            {item.details.status}
          </Badge>
        </Group>
      </AccordionControl>
      <AccordionPanel>
        <Stack>
          {/* <Text>{item.details.description}</Text> */}
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Attended</TableTh>
                <TableTh>Interested</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              <TableTr>
                <TableTd>{item.attended != undefined ? item.attended : "0"}</TableTd>
                <TableTd>{item.rsvped != undefined ? item.rsvped : "0"}</TableTd>
              </TableTr>
            </TableTbody>
          </Table>
          <Button component={Link} href={`/dashboard/events/${item.details.id}/edit`} fullWidth color="rgba(91, 110, 253, 0.85)" variant="outline">
            Edit
          </Button>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <>
      <Title order={2}>My Events</Title>
      <Accordion mt={"2em"}>{items}</Accordion>
    </>
  );
}
