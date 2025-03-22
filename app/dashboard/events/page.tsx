import { Table, TableTd, TableTh, TableThead, TableTr, TableTbody, Text, Title, Group, Accordion, AccordionItem, AccordionControl, AccordionPanel, Stack, Badge } from "@mantine/core";
import { EventDetails } from "@/lib/types/events";
import { getUserEvents } from "@/lib/data/events/events-list-by-user";

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
          <Text>{item.details.description}</Text>
          <Table>
            <TableThead>
              <TableTr>
                <TableTh>Attended</TableTh>
                <TableTh>RSVPed</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              <TableTr>
                <TableTd>{item.attended}</TableTd>
                <TableTd>{item.rsvped}</TableTd>
              </TableTr>
            </TableTbody>
          </Table>
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
